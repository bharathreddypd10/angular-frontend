import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestservicesService } from '../../adminservices/requestservices.service';
import { ActivatedRoute } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper'; 
import { DriverstatusdialogComponent } from '../../dialogs/driverstatusdialog/driverstatusdialog.component';
import { StatusupdateService } from '../../statusupdateservice/statusupdate.service';
import { DriverservicesService } from '../../driverservices/driverservices.service';
import { LoginServiceService } from '../../login services/login-service.service';
import { NotificationserviceService } from '../../notificationservices/notificationservice.service';


@Component({
  selector: 'app-usertask',
  standalone: true,
  imports: [MatCard,CommonModule,MatCardModule,MatStepperModule],
  templateUrl: './usertask.component.html',
  styleUrl: './usertask.component.css'
})
export class UsertaskComponent implements OnInit {
  requests:any[]=[];
  bookingId: string | null = null;
  user_id:string='';
  email:string='';
  driverId:string='';

  steps = [1, 2, 3, 4, 5]; // Progress bar steps

  constructor(private serviceRequest: RequestservicesService,public dialog: MatDialog,private route: ActivatedRoute,private statusupdate:StatusupdateService,private driverservice:DriverservicesService,private loginservice:LoginServiceService,private notificationservice:NotificationserviceService) {}

  ngOnInit(): void {
    const decodedtoken =this.loginservice.decodeToken();
    this.driverId=decodedtoken['sub'];
    // Get the booking_id from the route parameters
    this.route.queryParamMap.subscribe(params => {
      this.bookingId = params.get('bookingId');
      if (this.bookingId) {
        this.fetchRequestByBookingId();

         // Load the current step from localStorage using the bookingId-based key
         const savedStatusIndex = localStorage.getItem(`currentStepIndex_${this.bookingId}`);
         this.currentStepIndex = savedStatusIndex ? parseInt(savedStatusIndex, 10) : 0;
      }
    });
  }
  // Fetch a specific service request based on booking_id
  fetchRequestByBookingId(): void {
    if (!this.bookingId) return; // Ensure bookingId is not null
    this.serviceRequest.getRequestByBookingId(this.bookingId).subscribe({
      next: (data) => {
        console.log(data);
        this.requests = data.requests || data; // Assuming data is the request object
        this.user_id=this.requests[0].user_id;
        this.email=this.requests[0].email;
      },
      error: (error) => {
        console.error('Error fetching request', error);
      }
    });
  }

  driverStatusSteps = [
    { label: 'Recevied Service Request' },
    { label: 'Enroute for Pickup' },
    { label: 'Vehicle Pick Up' },
    { label: 'Vehicle Servicing Pending' },
    { label: 'Vehicle Servicing Completed' },
    { label: 'Enroute for Dropoff' },
    { label: 'Vehicle Drop Off' }
  ];

  currentStepIndex = 0;

   // Open dialog when step label is clicked
   openDialog(stepLabel: string, stepIndex: number): void {
    if (stepIndex !== this.currentStepIndex) {
      const dialogRef = this.dialog.open(DriverstatusdialogComponent, {
        data: { stepLabel },
      });

      // Update the step immediately based on the dialog result
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.updateDriverStatus(stepIndex);
        }
      });
    }
  }

  updateDriverStatus(newStatusIndex: number): void {
    if (newStatusIndex >= 0 && newStatusIndex < this.driverStatusSteps.length) {
      this.currentStepIndex = newStatusIndex;

      if (this.bookingId) {
        // Save the current step with bookingId-specific key in localStorage
        localStorage.setItem(`currentStepIndex_${this.bookingId}`, newStatusIndex.toString());
      }
      // Send a notification and take action based on the new status index
      this.handleStatusUpdate(newStatusIndex);
    }
  }

  handleStatusUpdate(statusIndex: number): void {
    switch (statusIndex) {
      case 1:
        this.statusupdate.sendNotification('enroute_for_pickup', this.user_id, this.bookingId);
        break;
      case 2:
        this.statusupdate.sendNotification('vehicle_picked_up', this.user_id, this.bookingId);
        break;
      case 3:
        this.statusupdate.sendNotification('vehicle_servicing_pending', this.user_id, this.bookingId);
        break;
      case 4:
        this.statusupdate.sendNotification('vehicle_servicing_completed', this.user_id, this.bookingId);
        break;
      case 5:
        this.statusupdate.sendNotification('enroute_for_dropoff', this.user_id, this.bookingId);
        break;
      case 6:
        // This case signifies that the service is completed
        this.statusupdate.sendNotification('vehicle_dropped_off', this.user_id, this.bookingId);
        this.notificationservice.sendServiceCompletedEmail(this.email).subscribe({
          next:(response)=>{
            console.log(response);
          },
          error:(e)=>{
            console.log(e);
          }
        });
        // Mark the service request as completed
        this.serviceRequest.markRequestAsCompleted(this.bookingId, 'completed').subscribe({
          next: () => {
            console.log(`Request ${this.bookingId} marked as completed.`);
            
            // Update the driver's status to 'free'
            this.updateDriverStatusToFree();
          },
          error: (error) => {
            console.error('Error marking request as completed:', error);
          }
        });
        break;
      default:
        console.warn('No notification for this status');
    }

    // Update the step visually
    this.statusupdate.sendStatusUpdate(statusIndex);
    console.log(`Driver status updated to step ${statusIndex}: ${this.driverStatusSteps[statusIndex].label}`);
  }

  updateDriverStatusToFree(): void {
    // Check if the driver is already free to avoid redundant API calls
    if (this.driverId) {
      this.driverservice.updateDriver(this.driverId, { status: 'free' }).subscribe({
        next: (response) => {
          console.log('Driver status updated to free successfully', response.status);
        },
        error: (error) => {
          console.error('Error updating driver status to free:', error);
        }
      });
    }
  }
}

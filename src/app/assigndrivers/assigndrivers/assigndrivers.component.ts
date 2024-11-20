import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestservicesService } from '../../adminservices/requestservices.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DriverservicesService } from '../../driverservices/driverservices.service';
import { StatusupdateService } from '../../statusupdateservice/statusupdate.service';
import { NotificationserviceService } from '../../notificationservices/notificationservice.service';
import { concat } from 'rxjs';


@Component({
  selector: 'app-assigndrivers',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './assigndrivers.component.html',
  styleUrl: './assigndrivers.component.css'
})
export class AssigndriversComponent implements OnInit{

  requests: any[] = [];
  freeDrivers: any[] = [];  // Array to hold available free drivers
  bookingId: string | null = null;
  selectedStatus: string = 'none';

  constructor(private requestService: RequestservicesService,private route: ActivatedRoute,private driverservice:DriverservicesService,private statusservice:StatusupdateService,private notificationservice:NotificationserviceService) {}

  ngOnInit(): void {
    // Get the booking_id from the route parameters
    this.route.queryParamMap.subscribe(params => {
      this.bookingId = params.get('bookingId');
      if (this.bookingId) {
        this.fetchRequestByBookingId();
      }
    });
  }

  // Fetch a specific service request based on booking_id
  fetchRequestByBookingId(): void {
    if (!this.bookingId) return; // Ensure bookingId is not null
    this.requestService.getRequestByBookingId(this.bookingId).subscribe({
      next: (data) => {
        console.log(data);
        this.requests = data.requests || data; // Assuming data is the request object
      },
      error: (error) => {
        console.error('Error fetching request', error);
      }
    });
  }

  // Fetch free drivers based on the selected status
  fetchFreeDrivers(): void {
    // Check if the selected status is 'free'
    if (this.selectedStatus === 'free') {
        this.driverservice.getDriversByStatus(this.selectedStatus).subscribe({
            next: (data) => {
                console.log(data);
                this.freeDrivers = data.drivers || []; // Adjust based on your API response structure
                console.log(this.freeDrivers);
            },
            error: (error) => {
                console.error('Error fetching free drivers', error);
            }
        });
    } else {
        // If status is 'none' or any other status, clear the freeDrivers array
        this.freeDrivers = [];
    }
}

   // Assign a driver to a request and update UI after assignment
  assignDriver(bookingId: string, driverId: string): void {
    if (!this.bookingId) return;

    this.requestService.assignDriver(this.bookingId, driverId).subscribe({
      next: (response) => {
        console.log('Driver assigned successfully:', response);
        this.statusservice.sendNotification('driver_assigned',response.user_id,bookingId);
        this.notificationservice.sendDriverAssignedEmail(response.email,response.driver_name,bookingId).subscribe({
          next:(response)=>{
            console.log(response);
          },
          error:(e)=>{
            console.log(e);
          }
        });
        // Update assigned driver and refresh free drivers list
        const assignedRequest = this.requests.find(req => req.booking_id === bookingId);
        if (assignedRequest) assignedRequest.driver_id = driverId;
        this.fetchFreeDrivers(); // Refresh free drivers list after assignment
      },
      error: (error) => {
        console.error('Error assigning driver:', error);
      }
    });
  }

}

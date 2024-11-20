import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RequestservicesService } from '../../adminservices/requestservices.service';
import { MatButtonModule } from '@angular/material/button';
import { MatHeaderCellDef, MatHeaderRowDef, MatRowDef, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { StatusupdateService } from '../../statusupdateservice/statusupdate.service';
import { NotificationserviceService } from '../../notificationservices/notificationservice.service';

@Component({
  selector: 'app-pendingservicerequests',
  standalone: true,
  imports: [DatePipe,MatButtonModule,MatTableModule,MatHeaderRowDef,MatHeaderCellDef,MatRowDef,CommonModule],
  templateUrl: './pendingservicerequests.component.html',
  styleUrl: './pendingservicerequests.component.css'
})
export class PendingservicerequestsComponent implements OnInit {
  
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['bookingId','customerName', 'vehicleType', 'serviceType', 'serviceDate', 'serviceTime', 'location','status', 'actions'];

  constructor(private serviceRequestService: RequestservicesService,private statusupdateService:StatusupdateService,private emailService:NotificationserviceService) {}

  ngOnInit(): void {
    // Load service requests using the service and set them to MatTableDataSource
    this.serviceRequestService.getPendingRequests().subscribe((response) => {
      this.dataSource.data = response.pending_requests;; // Update the dataSource with the request data
    });
  }

  acceptRequest(request: any) {
    const booking_id = request.booking_id;
  
    // Call the service method and subscribe to handle response
    this.serviceRequestService.acceptRequest(booking_id, 'accepted').subscribe({
      next: (response) => {
        alert(`Request accepted for ${request.customerName}`);
        console.log(response);
        if (response.status === 'accepted') {
          // Trigger notification to the user after the request is accepted
          this.statusupdateService.sendNotification('request_confirmed', request.user_id, booking_id);
          this.emailService.sendRequestAcceptedEmail(request.email,booking_id).subscribe({
            next:(response)=>{
              console.log('Service Request Accepted Email Sent', response);
            },
            error:(e)=>{
              console.error('Error sending email', e);
            }
          }
            
          );
        }
        // Reload the table data after a successful response
        this.reloadRequests();
      },
      error: (error) => {
        console.error('Error accepting the request:', error);
        alert('Failed to accept the request. Please try again.');
      },
      complete: () => {
        console.log('Accept request completed');
      }
    });
  }

  rejectRequest(request: any) {
    // Call the service method to reject the request
    this.serviceRequestService.deleteRequest(request);
    alert(`Request rejected for ${request.customerName}`);

    // Reload the table data after rejecting the request
    this.reloadRequests();
  }

  // Method to reload the requests after any changes
  reloadRequests(): void {
    this.serviceRequestService.getPendingRequests().subscribe((requests) => {
      this.dataSource.data = requests.pending_requests; // Update the dataSource with fresh data
    });
  }

}

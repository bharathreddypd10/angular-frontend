import { Component, OnInit } from '@angular/core';
import { RequestservicesService } from '../adminservices/requestservices.service';
import { LoginServiceService } from '../login services/login-service.service';
import { MatCellDef, MatColumnDef, MatHeaderCellDef, MatHeaderRowDef, MatRowDef, MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-upcomingbookings',
  standalone: true,
  imports: [DatePipe,MatTable,CommonModule,MatButtonModule,MatHeaderRowDef,MatHeaderCellDef,MatRowDef,MatColumnDef,MatCellDef,MatTableModule],
  templateUrl: './upcomingbookings.component.html',
  styleUrl: './upcomingbookings.component.css'
})
export class UpcomingbookingsComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  // Define columns to display
  displayedColumns: string[] = [
    'bookingId', 'name', 'mobile', 'serviceType', 
    'Date', 'Time', 'location', 'status'
  ];

  email:string='';
  constructor(private bookingService: RequestservicesService,private loginService:LoginServiceService,private router:Router) {}

  ngOnInit(): void {
    const decodedToken = this.loginService.decodeToken();
    this.email=decodedToken.email;
    this.fetchBookings();
  }
  
  fetchBookings(): void {
    this.bookingService.getAcceptedRequestsByEmail(this.email).subscribe({
      next: (response) => {
        if (response && response.requests) {
          console.log(response.requests);
          this.dataSource.data = response.requests; // Assigns data for table
        } else {
          console.error("User requests data not found in response");
        }
      },
      error: (err) => console.error('Error fetching bookings:', err)
    });
  }
  
  onRowClick(request: any) {
    // Navigate to AssignDriverComponent with the booking_id as a route parameter
    this.router.navigate(['/userdashboard/viewdriver'] , { queryParams: { bookingId: request.booking_id } });
  }

}

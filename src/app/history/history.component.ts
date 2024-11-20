import { Component, OnInit } from '@angular/core';
import { MatCellDef, MatColumnDef, MatHeaderCellDef, MatHeaderRowDef, MatRowDef, MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RequestservicesService } from '../adminservices/requestservices.service';
import { LoginServiceService } from '../login services/login-service.service';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [DatePipe,MatTable,CommonModule,MatButtonModule,MatHeaderRowDef,MatHeaderCellDef,MatRowDef,MatColumnDef,MatCellDef,MatTableModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit{

  dataSource = new MatTableDataSource<any>();

  // Define columns to display in the table
  displayedColumns: string[] = [
    'bookingId', 'name', 'mobile', 'serviceType',
    'Date', 'Time', 'location', 'status'
  ];

  email: string = '';

  constructor(private bookingService: RequestservicesService, private loginService: LoginServiceService, private router: Router) {}

  ngOnInit(): void {
    // Decode the token to get the email of the logged-in user
    const decodedToken = this.loginService.decodeToken();
    this.email = decodedToken.email;
    this.fetchCompletedBookings();
  }

  fetchCompletedBookings(): void {
    // Fetch completed bookings based on user email
    this.bookingService.getCompletedRequestsByEmail(this.email).subscribe({
      next: (response) => {
        if (response && response.requests) {
          console.log(response.requests);
          this.dataSource.data = response.requests; // Assigns data for table display
        } else {
          console.error("User requests data not found in response");
        }
      },
      error: (err) => console.error('Error fetching completed bookings:', err)
    });
  }
  

}

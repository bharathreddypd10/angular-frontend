import { Component, OnInit } from '@angular/core';
import { MatCellDef, MatColumnDef, MatHeaderCellDef, MatHeaderRowDef, MatRowDef, MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RequestservicesService } from '../../adminservices/requestservices.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-completedservices',
  standalone: true,
  imports: [DatePipe,MatTable,CommonModule,MatButtonModule,MatHeaderRowDef,MatHeaderCellDef,MatRowDef,MatColumnDef,MatCellDef,MatTableModule],
  templateUrl: './completedservices.component.html',
  styleUrl: './completedservices.component.css'
})
export class CompletedservicesComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  
  // Define columns to display
  displayedColumns: string[] = [
    'bookingId', 'name', 'mobile', 'serviceType', 
    'Date', 'Time', 'location', 'status'
  ];

  constructor(private bookingService: RequestservicesService) {}

  ngOnInit(): void {
    this.fetchCompletedServices();
  }

  // Fetches completed service requests from the server
  fetchCompletedServices(): void {
    this.bookingService.getCompletedRequests().subscribe({
      next: (response) => {
        if (response && response.requests) {
          console.log(response.requests);
          this.dataSource.data = response.requests; // Assigns data for the table
        } else {
          console.error("Completed requests data not found in response");
        }
      },
      error: (err) => console.error('Error fetching completed services:', err)
    });
  }

}

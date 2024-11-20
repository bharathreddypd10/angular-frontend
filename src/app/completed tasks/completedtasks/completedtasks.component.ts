import { Component, OnInit } from '@angular/core';
import { MatCellDef, MatColumnDef, MatHeaderCellDef, MatHeaderRowDef, MatRowDef, MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RequestservicesService } from '../../adminservices/requestservices.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LoginServiceService } from '../../login services/login-service.service';

@Component({
  selector: 'app-completedtasks',
  standalone: true,
  imports: [DatePipe,MatTable,CommonModule,MatButtonModule,MatHeaderRowDef,MatHeaderCellDef,MatRowDef,MatColumnDef,MatCellDef,MatTableModule],
  templateUrl: './completedtasks.component.html',
  styleUrl: './completedtasks.component.css'
})
export class CompletedtasksComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();

  // Define columns to display
  displayedColumns: string[] = [
    'bookingId', 'name', 'mobile', 'serviceType', 
    'Date', 'Time', 'location', 'status'
  ];
  driverId:string='';
  
  constructor(private bookingService: RequestservicesService,private loginservice:LoginServiceService) {}

  ngOnInit(): void {
    const decodedtoken=this.loginservice.decodeToken();
    this.driverId=decodedtoken['sub'];
    this.fetchCompletedTasks(this.driverId);
  }

  // Fetches completed tasks filtered by driver ID
  fetchCompletedTasks(driverId: string): void {
    this.bookingService.getCompletedTasks(driverId).subscribe({
      next: (response) => {
        if (response && response.requests) {
          console.log(response.requests);
          this.dataSource.data = response.requests; // Assigns data for the table
        } else {
          console.error("Completed tasks data not found in response");
        }
      },
      error: (err) => console.error('Error fetching completed tasks:', err)
    });
  }

}

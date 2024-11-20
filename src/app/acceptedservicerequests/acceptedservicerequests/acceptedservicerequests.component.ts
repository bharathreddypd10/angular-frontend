import { MatTableDataSource,MatTable, MatHeaderRowDef, MatHeaderCellDef, MatRowDef, MatColumnDef, MatCellDef, MatTableModule } from '@angular/material/table';
import { RequestservicesService } from './../../adminservices/requestservices.service';
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceptedservicerequests',
  standalone: true,
  imports: [DatePipe,MatTable,CommonModule,MatButtonModule,MatHeaderRowDef,MatHeaderCellDef,MatRowDef,MatColumnDef,MatCellDef,MatTableModule],
  templateUrl: './acceptedservicerequests.component.html',
  styleUrl: './acceptedservicerequests.component.css'
})
export class AcceptedservicerequestsComponent implements OnInit{

  dataSource = new MatTableDataSource<any>(); // DataSource for accepted requests
  displayedColumns: string[] = ['bookingId','customerName', 'vehicleType', 'serviceType', 'serviceDate', 'serviceTime', 'location', 'status'];

  constructor(private serviceRequestService: RequestservicesService,private router: Router) {}

  ngOnInit(): void {
    // Load accepted service requests from the service
    this.serviceRequestService.getAcceptedRequests().subscribe((response) => {
      console.log(response);
      this.dataSource.data = response.accepted_requests|| [];
    });
  }

  onRowClick(request: any) {
    // Navigate to AssignDriverComponent with the booking_id as a route parameter
    this.router.navigate(['/admindashboard/assigndrivers'] , { queryParams: { bookingId: request.booking_id } });
  }

}

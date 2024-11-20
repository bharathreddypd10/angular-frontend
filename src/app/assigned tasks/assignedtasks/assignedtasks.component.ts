import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RequestservicesService } from '../../adminservices/requestservices.service';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../login services/login-service.service';

@Component({
  selector: 'app-assignedtasks',
  standalone: true,
  imports: [CommonModule,MatTableModule],
  templateUrl: './assignedtasks.component.html',
  styleUrl: './assignedtasks.component.css'
})
export class AssignedtasksComponent implements OnInit {

  dataSource = new MatTableDataSource<any>(); // DataSource for accepted requests
  displayedColumns: string[] = ['bookingId','customerName', 'vehicleType', 'serviceType', 'serviceDate', 'serviceTime', 'location'];
  driver_id='';
  constructor(private serviceRequestService: RequestservicesService,private router: Router,private loginservice:LoginServiceService) {}

  ngOnInit(): void {
    const decodedtoken=this.loginservice.decodeToken();
    this.driver_id=decodedtoken['sub'];
    // Load accepted service requests from the service
    this.serviceRequestService.getAcceptedRequests().subscribe((response) => {
      console.log(response);
      const filteredRequests = response.accepted_requests.filter((request: { driver_id: string}) => request.driver_id === this.driver_id);
    this.dataSource.data = filteredRequests;
    });
  }

  onRowClick(request: any) {
    // Navigate to AssignDriverComponent with the booking_id as a route parameter
    this.router.navigate(['/driverdashboard/usertask'] , { queryParams: { bookingId: request.booking_id } });
  }

}

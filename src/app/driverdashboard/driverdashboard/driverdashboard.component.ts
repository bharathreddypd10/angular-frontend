import { Component } from '@angular/core';
import { DriverSidebarComponent } from '../../driver-sidebar/driver-sidebar/driver-sidebar.component';

@Component({
  selector: 'app-driverdashboard',
  standalone: true,
  imports: [DriverSidebarComponent],
  templateUrl: './driverdashboard.component.html',
  styleUrl: './driverdashboard.component.css'
})
export class DriverdashboardComponent {

}

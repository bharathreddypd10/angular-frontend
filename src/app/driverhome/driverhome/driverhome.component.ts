import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-driverhome',
  standalone: true,
  imports: [],
  templateUrl: './driverhome.component.html',
  styleUrl: './driverhome.component.css'
})
export class DriverhomeComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  // Method to navigate to different components based on the div clicked
  navigateTo(route: string) {
    this.router.navigate([route], { relativeTo: this.route });
  }

}

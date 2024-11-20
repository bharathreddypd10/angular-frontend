import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  // Method to navigate to different components based on the div clicked
  navigateTo(route: string) {
    this.router.navigate([route], { relativeTo: this.route });
  }

}

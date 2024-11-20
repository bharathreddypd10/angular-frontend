import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-userhome',
  standalone: true,
  imports: [],
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.css'
})
export class UserhomeComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  // Method to navigate to different components based on the div clicked
  navigateTo(route: string) {
    this.router.navigate([route], { relativeTo: this.route });
  }

}

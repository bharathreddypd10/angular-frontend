import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminAppNavbarComponent } from '../admin-app-navbar/admin-app-navbar.component';
import { UserAppNavbarComponent } from '../user-app-navbar/user-app-navbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet,AdminAppNavbarComponent,UserAppNavbarComponent,],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}

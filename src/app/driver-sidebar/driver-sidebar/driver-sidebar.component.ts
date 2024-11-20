import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LogoutServiceService } from '../../logout services/logout-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-driver-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule,RouterOutlet],
  templateUrl: './driver-sidebar.component.html',
  styleUrl: './driver-sidebar.component.css'
})
export class DriverSidebarComponent {

  isSidebarActive: boolean = false;
  isNavbarCollapsed: boolean = true;
  isSubmenuActive: any = {
    homeSubmenu: false,
    pageSubmenu: false
  };

  constructor(private router: Router,private logoutService:LogoutServiceService) {}
  onLogout(): void {
    this.logoutService.logout();
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed; // Toggle the navbar state
  }

}

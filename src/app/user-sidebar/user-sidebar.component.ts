import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LogoutServiceService } from '../logout services/logout-service.service';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterOutlet],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent {
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

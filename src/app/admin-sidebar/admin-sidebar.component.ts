import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { LogoutServiceService } from '../logout services/logout-service.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule,RouterOutlet],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
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

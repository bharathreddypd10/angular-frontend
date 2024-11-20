import { MatListModule } from '@angular/material/list';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserSidebarComponent } from '../user-sidebar/user-sidebar.component';

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [MatListModule,MatIconModule,MatToolbarModule,MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule,RouterModule,
    UserSidebarComponent],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css'
})
export class UserdashboardComponent {

  isActive = false;

  toggleSidebar() {
    this.isActive = !this.isActive;
  }
}

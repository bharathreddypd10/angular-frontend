import { RegisteredUsersComponent } from './../registered-users/registered-users.component';
import { Component } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AdminSidebarComponent } from "../admin-sidebar/admin-sidebar.component";

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule,AdminSidebarComponent, RegisteredUsersComponent, RouterOutlet, AdminSidebarComponent],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent{

}

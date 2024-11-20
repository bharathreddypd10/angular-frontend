import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { LoginServiceService } from '../login services/login-service.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [FormsModule,CommonModule, MatInputModule, MatButtonModule, MatFormField, MatLabel],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
  adminDetails: any = {  // Initialize adminDetails
    email: '',
    adminName: '',
    phoneNumber: ''
  }; 
  isEditing: boolean = false; 
  updateSuccess: boolean = false;  // Flag to indicate successful update
  updateError: boolean = false;    // Flag to indicate an error during update

  constructor(private loginService: LoginServiceService) {}

  ngOnInit(): void {
    const decodedToken = this.loginService.decodeToken(); // Decode the token from the login service

    if (decodedToken) {
      // Populate adminDetails from the token (assume the token contains all necessary fields)
      this.adminDetails = {
        email: decodedToken.email,
        adminName: decodedToken.adminName,
        phoneNumber: decodedToken.phoneNumber || '',  // Handle undefined phoneNumber
      };
      console.log('Admin Details:', this.adminDetails);  // Log admin details for debugging
    } else {
      console.error('Invalid token or no token available');
    }
  }

  // Toggle edit mode
  toggleEdit(): void {
    this.isEditing = !this.isEditing;  // Toggle the edit mode
    this.updateSuccess = false;        // Reset success message on edit
    this.updateError = false;          // Reset error message on edit
  }

  // Save updated admin profile details
  saveProfile(): void {
    // Logic to save the updated profile details
    this.loginService.updateAdminDetails(this.adminDetails.email,this.adminDetails).subscribe({
      next: (response) => {
        console.log('Admin profile updated:', response);
        this.isEditing = false;        // Exit edit mode after saving
        this.updateSuccess = true;     // Set success flag
        // Ensure adminDetails are updated with the new data from response
        if (response.driver) {
          this.adminDetails = { ...response.admin };
        } else {
          console.warn("Updated driver details not received in response");
        }
      },
      error: (error) => {
        console.error('Error updating admin profile:', error);
        this.updateError = true;       // Set error flag if the update fails
      }
    });
  }

}

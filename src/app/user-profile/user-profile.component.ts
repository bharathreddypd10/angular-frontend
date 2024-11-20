import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login services/login-service.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule, MatButtonModule, MatFormField, MatLabel],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  userDetails: any = { // Initialize userDetails
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: ''
  }; 
  isEditing: boolean = false; 
  updateSuccess: boolean = false; // Flag to indicate successful update
  updateError: boolean = false; // Flag to indicate an error during update

  constructor(private loginService: LoginServiceService) {}

  ngOnInit(): void {
    const decodedToken = this.loginService.decodeToken();

    if (decodedToken) {
      this.userDetails = {
        email: decodedToken.email,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        phoneNumber: decodedToken.phoneNumber || '', // Handle undefined case
        address: decodedToken.address || ''          // Handle undefined case
      };
      console.log('User Details:', this.userDetails);  // Log to see the details
    } else {
      console.error('Invalid token or no token available');
    }
  }
  toggleEdit(): void {
    this.isEditing = !this.isEditing; // Toggle the edit mode
    this.updateSuccess = false; // Reset success message on edit
    this.updateError = false; // Reset error message on edit
  }

  saveProfile(): void {
    // Logic to save updated profile details
    this.loginService.updateUserDetails(this.userDetails.email,this.userDetails).subscribe({
      next:(response) => {
        console.log('Profile updated:', response);
        this.isEditing = false; // Turn off editing mode after saving
        this.updateSuccess = true; // Set success flag
        // Ensure userDetails are updated with the new data from response
        if (response.user) {
          this.userDetails = { ...response.user };
        } else {
          console.warn("Updated driver details not received in response");
        }
      },
      error:(error) => {
        console.error('Error updating profile:', error);
        this.updateError = true; // Set error flag
      }
  });
  }
}

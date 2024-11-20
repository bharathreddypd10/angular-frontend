import { Component } from '@angular/core';
import { LoginServiceService } from '../../login services/login-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DriverservicesService } from '../../driverservices/driverservices.service';

@Component({
  selector: 'app-driverprofile',
  standalone: true,
  imports: [FormsModule,CommonModule,MatInputModule,MatButtonModule,MatFormField,MatLabel],
  templateUrl: './driverprofile.component.html',
  styleUrl: './driverprofile.component.css'
})
export class DriverprofileComponent {

  driverDetails: any = {  // Initialize adminDetails
    driver_email: '',
    driver_name: '',
    driver_mobile: '',
    driver_age:'',
    driver_id:''
  }; 
  isEditing: boolean = false; 
  updateSuccess: boolean = false;  // Flag to indicate successful update
  updateError: boolean = false;    // Flag to indicate an error during update

  constructor(private loginService: LoginServiceService,private driverservice: DriverservicesService) {}

  ngOnInit(): void {
    const decodedToken = this.loginService.decodeToken(); // Decode the token from the login service

    if (decodedToken) {
      // Populate adminDetails from the token (assume the token contains all necessary fields)
      this.driverDetails = {
        driver_email: decodedToken.driver_email,
        driver_name: decodedToken.driver_name,
        driver_mobile: decodedToken.driver_mobile || '',  // Handle undefined phoneNumber
        driver_age:decodedToken.driver_age,
        driver_id:decodedToken.driver_id || decodedToken.sub
      };
      console.log('Driver Details:', this.driverDetails);  // Log admin details for debugging
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
    this.driverservice.updateDriver(this.driverDetails.driver_id,this.driverDetails).subscribe({
      next: (response) => {
        // console.log('Driver profile updated:', response);
        this.isEditing = false;        // Exit edit mode after saving
        this.updateSuccess = true;     // Set success flag
        // Ensure driverDetails are updated with the new data from response
        if (response.driver) {
          this.driverDetails = { ...response.driver };
        } else {
          console.warn("Updated driver details not received in response");
        }
      },
      error: (error) => {
        console.error('Error updating Driver profile:', error);
        this.updateError = true;       // Set error flag if the update fails
      }
    });
  }

}

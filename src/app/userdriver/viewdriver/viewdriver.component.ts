import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { DriverservicesService } from '../../driverservices/driverservices.service';
import { ActivatedRoute } from '@angular/router';
import {MatStepperModule} from '@angular/material/stepper'; 
import { StatusupdateService } from '../../statusupdateservice/statusupdate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-viewdriver',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatCardModule,MatStepperModule],
  templateUrl: './viewdriver.component.html',
  styleUrl: './viewdriver.component.css'
})
export class ViewdriverComponent implements OnInit{
  drivers: any[] = [];  // Updated to store an array of drivers
  bookingId: string|null=null;
  private statusSubscription: Subscription | undefined;
  currentStepIndex = 0;
  private storageKey = 'currentStepIndex';

  constructor(private driverService: DriverservicesService,private route: ActivatedRoute,private statusupdate:StatusupdateService ) {}

  ngOnInit(): void {
    // Get the booking_id from the route parameters
    this.route.queryParamMap.subscribe(params => {
      this.bookingId = params.get('bookingId');
      if (this.bookingId) {
        this.loadDriverDetails();
        // Load the current step from localStorage using the bookingId-based key
        const savedIndex = localStorage.getItem(`currentStepIndex_${this.bookingId}`);
        this.currentStepIndex = savedIndex ? parseInt(savedIndex, 10) : 0;
      }
    });
    // Subscribe to WebSocket status updates
    this.statusSubscription = this.statusupdate.getStatusUpdates().subscribe(
      (newStatusIndex: number) => {
        this.updateDriverStatus(newStatusIndex);
      }
    );
  }
  ngOnDestroy(): void {
    // Unsubscribe if statusSubscription is defined
    if (this.statusSubscription) {
      console.log('Unsubscribing from status updates');
      this.statusSubscription.unsubscribe();
    }
  }

  loadDriverDetails() {
    if (this.bookingId) {
      this.driverService.getDriverByBookingId(this.bookingId).subscribe({
        next: (data) => {
          // Directly assign the array from API response
          this.drivers = data.driver || [];
        },
        error: (error) => {
          console.error("Error fetching driver details:", error);
        }
      });
    } else {
      console.warn("Booking ID is null, cannot fetch driver details.");
    }
  }

  // Define the status steps for driver progress tracking
  UserStatusSteps = [
    { label: 'Driver Assigned' },
    { label: 'Driver Enroute for Pickup' },
    { label: 'Vehicle Picked Up' },
    { label: 'Vehicle Servicing Pending' },
    { label: 'Vehicle Servicing Completed' },
    { label: 'Driver Enroute for Dropoff' },
    { label: 'Vehicle Dropped Off' }
  ];

  updateDriverStatus(newStatusIndex: number): void {
    if (newStatusIndex >= 0 && newStatusIndex < this.UserStatusSteps.length) {
      this.currentStepIndex = newStatusIndex;

      if (this.bookingId) {
        // Save the current step with bookingId-specific key in localStorage
        localStorage.setItem(`currentStepIndex_${this.bookingId}`, newStatusIndex.toString());
      }

      console.log('Updated Driver Status:', this.currentStepIndex);
    }
  }
}

import { GooglemapsComponent } from './../googlemaps/googlemaps.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RequestservicesService } from '../adminservices/requestservices.service';
import { ManagingservicesService } from '../servicemanager/managingservices.service';
import { SnackbarService } from '../snackbar/snackbar.service';
@Component({
  selector: 'app-service-request',
  standalone: true,
  imports: [GooglemapsComponent,CommonModule,MatInputModule,MatSelectModule,MatButtonModule,MatDatepickerModule,MatNativeDateModule,MatFormFieldModule,MatIconModule,ReactiveFormsModule],
  templateUrl: './service-request.component.html',
  styleUrl: './service-request.component.css'
})
export class ServiceRequestComponent implements OnInit {

  bookingForm: FormGroup;
  vehicleTypes: string[]=['2-Wheeler','4-Wheeler'];
  serviceTypes: string[] = [];

  constructor(private fb: FormBuilder,private dialog: MatDialog,private serviceRequestService: RequestservicesService,private managingservice:ManagingservicesService,private snackbarservice: SnackbarService ) {
    this.bookingForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(3)]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      vehicleType: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      serviceType: ['', Validators.required],
      serviceDate: ['', Validators.required],
      serviceTime: ['', Validators.required],
      location: ['', Validators.required],
      comments: ['']
    });
    console.log('servicerequest component initialized with NotificationService');
  }

  ngOnInit(): void {
    this.loadServiceTypes();  // Load service types when the component initializes
  }

  loadServiceTypes(): void {
    this.managingservice.getAllServices().subscribe({
      next: (services) => {
        const allServiceTypes = services.map((service: any) => service.service_type) as string[];  // Extract service types
        this.serviceTypes = [...new Set(allServiceTypes)];  // Remove duplicates using Set
      },
      error: (err) => {
        console.error('Error fetching service types:', err);
      }
    });
  }

  openMapModal() {
    const dialogRef = this.dialog.open(GooglemapsComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.address) {
        this.bookingForm.patchValue({ location: result.address });
      }
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.serviceRequestService.createServiceRequest(this.bookingForm.value)
          .subscribe({
              next: (response) => {
                  console.log('Form Submitted Successfully', response);
                  this.snackbarservice.openSnackBar('Booking Successful!', 'Cancel');

                  // Reset the form after successful submission
                  this.bookingForm.reset();
                  this.bookingForm.markAsPristine();
                  this.bookingForm.markAsUntouched();

                  // Clear any form errors
                  Object.keys(this.bookingForm.controls).forEach(key => {
                      this.bookingForm.controls[key].setErrors(null);
                  });
              },
              error: (error) => {
                  console.error('Error submitting the form:', error);
                  this.snackbarservice.openSnackBar('Booking failed. Please try again.', 'Cancel');
                  // alert('Booking failed. Please try again.');
              },
              complete: () => {
                  console.log('Request completed');
              }
          });
  } else {
      console.log('Form is Invalid');
      this.bookingForm.markAllAsTouched(); // Show validation errors
  }
}

}

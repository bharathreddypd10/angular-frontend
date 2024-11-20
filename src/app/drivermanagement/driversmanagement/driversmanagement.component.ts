import { Component, OnInit } from '@angular/core';
import { DriverservicesService } from '../../driverservices/driverservices.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-driversmanagement',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './driversmanagement.component.html',
  styleUrl: './driversmanagement.component.css'
})
export class DriversmanagementComponent implements OnInit{

  drivers: any[] = [];
  addDriverForm!: FormGroup;
  editForm!: FormGroup;
  selectedDriver: any = null;
  isAddingDriver: boolean = false;
  isEditing: boolean = false;
  errorMessage: string = '';

  constructor(
    private driverService: DriverservicesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchDrivers();

    // Initialize form for adding a driver
    this.addDriverForm = this.fb.group({
      driver_name: ['', Validators.required],
      driver_age: ['', [Validators.required, Validators.min(18)]],
      driver_email: ['', [Validators.required, Validators.email]],
      driver_password: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#]).+$')
      ]],
      driver_mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      status: ['free']
    });

    // Initialize form for editing a driver
    this.editForm = this.fb.group({
      driver_name: ['', Validators.required],
      driver_age: ['', [Validators.required, Validators.min(18)]],
      driver_email: ['', [Validators.required, Validators.email]],
      driver_mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      status: ['']
    });
  }

  get f() { return this.addDriverForm.controls; }

  // Fetch drivers from the backend
  fetchDrivers(): void {
    this.driverService.getDrivers().subscribe({
      next: (data: any) => {
        this.drivers = data.drivers;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to fetch drivers.';
        console.error(err);
      }
    });
  }

  // Show form to add a new driver
  onAddDriver(): void {
    this.isAddingDriver = true;
  }

  // Submit the form for adding a new driver
  onSubmitNewDriver(): void {
    if (this.addDriverForm.invalid) return;

    const newDriver = this.addDriverForm.value;

    this.driverService.addDriver(newDriver).subscribe({
      next: () => {
        alert('Driver added successfully!');
        this.isAddingDriver = false;
        this.addDriverForm.reset();
        this.fetchDrivers();  // Refresh driver list
      },
      error: (err: any) => {
        if (err.status === 400) {
          // Conflict error for duplicate email or phone number
          this.errorMessage = 'Driver already exists with the same email or phone number';
          alert(this.errorMessage);
        } else {
          this.errorMessage = 'Error adding driver.';
        }
      }
    });
  }

  // Show form to edit an existing driver
  onEdit(driver: any): void {
    this.selectedDriver = driver;
    this.isEditing = true;
    this.editForm.patchValue({
      driver_name: driver.driver_name,
      driver_age: driver.driver_age,
      driver_email: driver.driver_email,
      driver_mobile: driver.driver_mobile,
      status: driver.status
    });
  }

  // Submit the form for updating a driver
  onUpdate(): void {
    if (this.editForm.invalid) return;

    const updatedDriver = { 
      ...this.editForm.getRawValue(), 
      driver_id: this.selectedDriver.driver_id  // Include the driver ID explicitly
    };
      
    this.driverService.updateDriver(this.selectedDriver.driver_id,updatedDriver).subscribe({
      next: () => {
        alert('Driver updated successfully!');
        this.fetchDrivers();
        this.isEditing = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Driver already exists with the same email or phone number';
        alert(this.errorMessage);
        console.error(err);
      }
    });
  }

  // Delete a driver
  onDelete(driverId: string): void {
    if (confirm('Are you sure you want to delete this driver?')) {
      this.driverService.deleteDriver(driverId).subscribe({
        next: () => {
          alert('Driver deleted successfully!');
          this.fetchDrivers();
        },
        error: (err: any) => {
          this.errorMessage = 'Error deleting driver.';
          console.error(err);
        }
      });
    }
  }

  // Cancel the add driver action
  onCancelAddDriver(): void {
    this.isAddingDriver = false;
    this.addDriverForm.reset();
  }

  // Cancel the edit driver action
  onCancel(): void {
    this.isEditing = false;
    this.selectedDriver = null;
  }


}

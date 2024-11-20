import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ManagingservicesService } from '../../servicemanager/managingservices.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-servicesmanagement',
  standalone: true,
  imports: [MatTableModule,ReactiveFormsModule,MatLabel,MatFormField,CurrencyPipe,CommonModule,FormsModule,MatDialogContent,MatDialogActions,MatInputModule],
  templateUrl: './servicesmanagement.component.html',
  styleUrl: './servicesmanagement.component.css'
})
export class ServicesmanagementComponent implements OnInit{

  serviceForm!: FormGroup;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['serviceType', 'price', 'actions'];
  editedService: any = null;
  showForm: boolean = false; 

  constructor(private fb: FormBuilder, private serviceManagementService: ManagingservicesService) { }

  ngOnInit(): void {
    this.loadServices();
    this.serviceForm = this.fb.group({
      service_type: [''],
      price: ['']
    });
  }

  // Load all services from backend
  loadServices(): void {
    this.serviceManagementService.getAllServices().subscribe((services) => {
      this.dataSource.data = services;
    });
  }

  // Start editing a service
  editService(service: any): void {
    this.editedService = { ...service };  // Clone the service object for editing
  }

  // Save the edited service
  saveService(): void {
    if (this.editedService) {
      this.serviceManagementService.updateService(this.editedService.id, this.editedService).subscribe(() => {
        this.loadServices();  // Reload after saving
        this.editedService = null;  // Exit edit mode
      });
    }
  }

  // Delete a service
  deleteService(serviceId: string): void {
    this.serviceManagementService.deleteService(serviceId).subscribe(() => {
      this.loadServices();  // Reload after deleting
    });
  }

  // Confirm adding a new service
  confirmAddService(): void {
    if (this.serviceForm.valid) {
      this.serviceManagementService.addService(this.serviceForm.value).subscribe({
        next: () => {
          this.loadServices();  // Reload after adding
          this.serviceForm.reset(); // Reset the form after adding
          console.log('Service added successfully!'); // Optional: success feedback
        },
        error: (err) => {
          console.error('Error adding service:', err); // Optional: error logging
          // Optionally show a user-friendly message
        }
      });
    } else {
      console.error('Form is invalid', this.serviceForm.errors); // Optional: log form errors
    }
  }

  // Cancel edit mode
  cancelEdit(): void {
    this.editedService = null;  // Exit edit mode
  }

  toggleForm(): void {
    this.showForm = !this.showForm;  // Toggle the form visibility
  }

}

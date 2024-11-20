import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserManagementService } from '../usermanagement services/user-management.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registered-users',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './registered-users.component.html',
  styleUrl: './registered-users.component.css'
})
export class RegisteredUsersComponent implements OnInit {

  users: any[] = [];
  addUserForm!: FormGroup;
  editForm!: FormGroup;
  selectedUser: any = null;
  isAddingUser: boolean = false;
  isEditing: boolean = false;
  errorMessage: string = '';

  constructor(
    private userService: UserManagementService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchUsers();

    // Initialize the form for adding a user
    this.addUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(10),Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#]).+$')]],
      phoneNumber: ['', [Validators.required,Validators.pattern('^[0-9]{10}$')]],
      address: ['']
    });

    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['' , Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['']
    });
  }

  get f() { return this.addUserForm.controls; }

  fetchUsers(): void {
    this.userService.fetchUsers().subscribe({
      next: (data:any) => {
        this.users = data.users;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to fetch users.';
        console.error(err);
      }
    });
  }

  onAddUser(): void {
    this.isAddingUser = true;
  }

  onSubmitNewUser(): void {
    if (this.addUserForm.invalid) return;

    const newUser = this.addUserForm.value;

    this.userService.addUser(newUser).subscribe({
      next: () => {
        alert('User added successfully!');
        this.isAddingUser = false;
        this.addUserForm.reset();
        this.fetchUsers(); // Refresh the user list
      },
      error: (err: any) => {
        if (err.status === 400) {
          // If conflict, show the error message
          this.errorMessage = 'User already exists with the same email or phone number';
          alert(this.errorMessage);
        } else {
          this.errorMessage = 'Error adding user.';
        }
      }
    });
  }

  onEdit(user: any): void {
    this.selectedUser = user;
    this.isEditing = true;
    this.editForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address
    });
  }

  onUpdate(): void {
    if (this.editForm.invalid) return;

    const updatedUser = {
      ...this.editForm.getRawValue(),
    };

    this.userService.updateUser(updatedUser).subscribe({
      next: () => {
        alert('User updated successfully!');
        this.fetchUsers();
        this.isEditing = false;
      },
      error: (err: any) => {
        this.errorMessage = 'user already exists with same email or phone number';
        alert(this.errorMessage);
        console.error(err);
      }
    });
  }

  onDelete(email: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(email).subscribe({
        next: () => {
          alert('User deleted successfully!');
          this.fetchUsers();
        },
        error: (err: any) => {
          this.errorMessage = 'Error deleting user.';
          console.error(err);
        }
      });
    }
  }

  onCancelAddUser(): void {
    this.isAddingUser = false;
    this.addUserForm.reset();
  }

  onCancel(): void {
    this.isEditing = false;
    this.selectedUser = null;
  }

}

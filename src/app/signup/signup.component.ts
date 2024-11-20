import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { SignupServiceService } from '../signup services/signup-service.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule,NavbarComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  errorMessage: string="";

  constructor(private fb: FormBuilder,private signupService: SignupServiceService,private router: Router,private snackbarservice: SnackbarService) {}

  ngOnInit(): void {
    // Using FormBuilder to create the form
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10),Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#]).+$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields in the template
  get f() { return this.signupForm.controls; }

  // Handle form submission
  onSubmit(): void {
    this.submitted = true;

    // Stop if the form is invalid
    if (this.signupForm.invalid) {
      this.errorMessage = 'Enter Required Fields';
      return;
    }
   
    // Form is valid, proceed with submission
    this.signupService.signup(this.signupForm.value).subscribe(
      {
        next: (response) => {
          // Handle successful signup
          console.log('Signup successful', response);
          this.signupForm.reset();
          // alert("signup successfull");
          this.snackbarservice.openSnackBar('Signup Successful!', 'Cancel');

          this.router.navigate(['/login']);
          this.submitted = false; 
        },
        error: (error) => {
          // Handle error
          this.errorMessage = 'Signup failed. Please try again.';
          console.error('Signup error', error);
        }
      });
  }
    onFieldChange(): void {
      // Clear error message when user interacts with any form field
      if (this.submitted) {
        this.errorMessage = '';
      }
  }
  
}

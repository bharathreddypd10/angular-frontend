import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { LoginServiceService } from '../login services/login-service.service';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,NavbarComponent,FormsModule,NgIf,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';
  isPasswordVisible: boolean = false;

  constructor(private fb: FormBuilder,private loginService: LoginServiceService,private router: Router,private snackbarservice:SnackbarService) {}

  ngOnInit(): void {
    // Initialize the login form using FormBuilder
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f():any{
    return this.loginForm.controls;
  }

  // Function to handle form submission
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    // Logic for actual login (can use a service to authenticate)
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    
    this.loginService.login({ email, password }).subscribe({
      next: (response) => {
        // Handle successful login
        console.log('Login successful');
        const token = response.token
        this.loginService.storeToken(token);
        const role = response.role;
        this.loginService.storeRole(role)
       
        // alert("Login Successful");
        this.snackbarservice.openSnackBar('Login Successful!', 'Cancel');
        if (role === 'admin') {
          this.router.navigate(['/admindashboard']); // Navigate to admin dashboard
        } else if (role === 'user') {
          this.router.navigate(['/userdashboard']); // Navigate to user dashboard
        }else if (role === 'driver') {
          this.router.navigate(['/driverdashboard']); // Navigate to driver dashboard
        }else {
          this.errorMessage = 'Unknown role, unable to navigate.';
          console.error('Unknown role:', role);
        }
      },
      error: (error) => {
        // Handle login error
        this.errorMessage = 'Login failed. Invalid credentials';
        console.error('Login failed', error);
      }
    });
    
  }

  // Function to toggle password visibility
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

}

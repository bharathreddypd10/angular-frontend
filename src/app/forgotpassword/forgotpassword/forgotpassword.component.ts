import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../../snackbar/snackbar.service';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  forgotPasswordForm: FormGroup;
  notificationMessage: string | null = null;

  constructor(
    private fb: FormBuilder,private snackbar:MatSnackBar,private snackbarservice:SnackbarService
  ) {
    // Initialize form with email field and validators
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Submit form and send password reset request
  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) return;
    this.openSnackBar('password reset link sent sucessfully to your registered mail ', 'Cancel');
    this.forgotPasswordForm.reset();

    // const email = this.forgotPasswordForm.value.email;
    // this.authService.sendPasswordResetEmail(email).subscribe({
    //   next: (response) => {
    //     // Show success notification
    //     this.notificationMessage = 'Password reset mail is sent to your registered email.';
    //     this.notificationService.showNotification(this.notificationMessage);

    //     // Optionally, clear the form after submission
    //     this.forgotPasswordForm.reset();
    //   },
    //   error: (error) => {
    //     console.error('Error sending reset email:', error);
    //     this.notificationMessage = 'There was an error sending the reset email. Please try again later.';
    //   }
    // });
  }
  openSnackBar(message: string, action: string) {
    const snackBarRef = this.snackbar.open(message, action, {
      duration: 10000, // Duration in milliseconds (10 seconds)
      verticalPosition: 'bottom', // Position at the top
      horizontalPosition: 'center', // Position at the right
      panelClass: ['custom-snackbar']
    });
  }

}

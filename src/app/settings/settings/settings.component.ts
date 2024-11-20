import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { LoginServiceService } from '../../login services/login-service.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

  passwordForm!: FormGroup<{
    currentPassword: FormControl<string | null>;
    newPassword: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
  }>;
  isPasswordChanged = false;
  currentPasswordInvalid = false;
  errorMessage: string="";

  constructor(private fb: FormBuilder,private loginservice:LoginServiceService) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      currentPassword: this.fb.control<string | null>('', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#]).+$')
      ]),
      newPassword: this.fb.control<string | null>('', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#]).+$')
      ]),
      confirmPassword: this.fb.control<string | null>('', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#]).+$')
      ])
    }, { validators: this.passwordsMatchValidator });
  }

  // Getter to simplify form control access
  get f() { return this.passwordForm.controls; }

  // Validator to check if the new password and confirm password match
  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  // Handle form submission
  onSubmit() {
    if (this.passwordForm.valid) {
      const currentPasswordValue = this.currentPassword.value; // Use .value to get the actual string
    const newPasswordValue = this.newPassword.value;
      // Assert that the value is a string (handle null/undefined checks before this point)
      if (currentPasswordValue && newPasswordValue) {
        // Call backend to validate current password
        this.loginservice.validateCurrentPassword(currentPasswordValue,newPasswordValue).subscribe({
          next: (isValid) => {
            if (isValid) {
              // If the current password is valid, proceed with the password change
              console.log('Password changed');
              this.isPasswordChanged = true;
              this.passwordForm.reset();
            } else {
              // If the current password is invalid, show an error
              this.currentPasswordInvalid = true;
            }
          },
          error: (err) => {
            console.error('Error validating password:', err);
            // Handle the error, e.g., show a notification or alert
          }
        });
      } else {
        // Handle case where the currentPassword is null or undefined
        this.currentPasswordInvalid = true;
      }
    }
  }

  // Helper methods to get form controls for easy access in the template
  get currentPassword() { return this.f['currentPassword']; }
  get newPassword() { return this.f['newPassword']; }
  get confirmPassword() { return this.f['confirmPassword']; }


  onFieldChange(): void {
    // Clear error message when user interacts with any form field
    if (this.isPasswordChanged) {
      this.errorMessage = '';
    }
}


}

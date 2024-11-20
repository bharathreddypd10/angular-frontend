import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar:MatSnackBar) { }
  // Method to open the Snackbar
  openSnackBar(message: string, action: string) {
    const snackBarRef = this.snackbar.open(message, action, {
      duration: 10000, // Duration in milliseconds (10 seconds)
      verticalPosition: 'top', // Position at the top
      horizontalPosition: 'right', // Position at the right
    });

  }
}

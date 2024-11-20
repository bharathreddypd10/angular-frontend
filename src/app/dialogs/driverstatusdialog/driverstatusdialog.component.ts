import { Component,Inject } from '@angular/core';
import {  MAT_DIALOG_DATA,MatDialogActions,MatDialogContent,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-driverstatusdialog',
  standalone: true,
  imports: [MatDialogContent,MatDialogActions],
  templateUrl: './driverstatusdialog.component.html',
  styleUrl: './driverstatusdialog.component.css'
})
export class DriverstatusdialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DriverstatusdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onOk(): void {
    this.dialogRef.close(true);
  }

}

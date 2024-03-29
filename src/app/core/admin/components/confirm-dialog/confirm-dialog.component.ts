import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/auth/interfaces';
import { Order } from 'src/app/orders/interfaces';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [
  ]
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSiClick(): void {
    this.dialogRef.close(true);
  }
}

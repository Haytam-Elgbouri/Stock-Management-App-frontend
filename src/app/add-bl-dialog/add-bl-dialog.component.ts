import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-bl-dialog',
  standalone: false,
  templateUrl: './add-bl-dialog.component.html',
  styleUrl: './add-bl-dialog.component.css'
})
export class AddBlDialogComponent {
 reference: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddBlDialogComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.reference.trim()) {
      this.dialogRef.close(this.reference);
    }
  }
}

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-br-dialog',
  standalone: false,
  templateUrl: './add-br-dialog.component.html',
  styleUrl: './add-br-dialog.component.css'
})
export class AddBrDialogComponent {
 reference: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddBrDialogComponent>
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

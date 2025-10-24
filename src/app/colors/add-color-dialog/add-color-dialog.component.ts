import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-color-dialog',
  standalone: false,
  templateUrl: './add-color-dialog.component.html',
  styleUrl: './add-color-dialog.component.css'
})
export class AddColorDialogComponent {
  colorName: string = '';

  constructor(
    private dialogRef: MatDialogRef<AddColorDialogComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.colorName.trim()) {
      this.dialogRef.close(this.colorName.trim());
    }
  }
}

import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-color-price-dialog',
  standalone: false,
  templateUrl: './add-color-price-dialog.component.html',
  styleUrl: './add-color-price-dialog.component.css'
})
export class AddColorPriceDialogComponent {
  form: FormGroup;
  isBarreFamily: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddColorPriceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isBarreFamily = data.family == 1; // PROFILE = BARRE
    this.form = this.fb.group({
      colorId: ['', Validators.required],
      prixUnitaireHT: [''],
      prixTotalHT: ['']
    });

    if (this.isBarreFamily) {
      this.form.get('prixUnitaireHT')?.setValidators([Validators.required, Validators.min(0)]);
    } else {
      this.form.get('prixTotalHT')?.setValidators([Validators.required, Validators.min(0)]);
    }
  }

  confirm() {
    if (this.form.valid) {
      const result = {
        colorId: this.form.value.colorId,
        prixUnitaireHT: this.isBarreFamily ? this.form.value.prixUnitaireHT : null,
        prixTotalHT: this.isBarreFamily ? null : this.form.value.prixTotalHT
      };
      this.dialogRef.close(result);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}

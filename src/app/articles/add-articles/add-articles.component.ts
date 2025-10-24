import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { ArticlesService } from '../../services/articles.service';
import { ColorService } from '../../services/color.service';
import { MatDialog } from '@angular/material/dialog';
import { AddColorPriceDialogComponent } from '../add-color-price-dialog/add-color-price-dialog.component';

@Component({
  selector: 'app-add-articles',
  standalone: false,
  templateUrl: './add-articles.component.html',
  styleUrl: './add-articles.component.css'
})
export class AddArticlesComponent implements OnInit {

  public addUserForm!: FormGroup;
  public colors: any[] = [];

  constructor(
    private fb: FormBuilder,
    private articlesService: ArticlesService,
    private snackbarService: SnackbarService,
    private colorService: ColorService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      reference: ['', Validators.required],
      designation: ['', Validators.required],
      family: ['', Validators.required],
      type: ['', Validators.required],
      longueur: [''],
      colorPrices: this.fb.array([])
    });

    // Load existing colors
    this.colorService.viewColors().subscribe({
      next: (data) => (this.colors = data),
      error: (err) => {
        const errorMessage = err?.error?.message || 'Erreur lors du chargement des couleurs';
        this.snackbarService.show('Erreur: ' + errorMessage);
      }
    });

    // Handle longueur validator depending on family
    this.addUserForm.get('family')?.valueChanges.subscribe((value) => {
      const longueurControl = this.addUserForm.get('longueur');
      if (value == 1) { // PROFILE/BARRE
        longueurControl?.setValidators([Validators.required]);
      } else {
        longueurControl?.setValue(null);
        longueurControl?.clearValidators();
      }
      longueurControl?.updateValueAndValidity();
    });
  }

  // Getter for template to access FormArray controls
  get colorPrices(): FormArray {
    return this.addUserForm.get('colorPrices') as FormArray;
  }

  // Open dialog to add a new color+price
  addColorPrice() {
    const familyValue = this.addUserForm.get('family')?.value;
    const dialogRef = this.dialog.open(AddColorPriceDialogComponent, {
      width: '400px',
      data: { colors: this.colors, family: familyValue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Push a new FormGroup into the FormArray
        this.colorPrices.push(this.fb.group({
          colorId: [result.colorId, Validators.required],
          prixUnitaireHT: [result.prixUnitaireHT ?? null],
          prixTotalHT: [result.prixTotalHT ?? null]
        }));
      }
    });
  }

  // Remove a color-price row
  removeColorPrice(index: number) {
    this.colorPrices.removeAt(index);
  }

  // Submit the form
  confirm() {
    const formData = {
      reference: this.addUserForm.value.reference,
      designation: this.addUserForm.value.designation,
      family: this.addUserForm.value.family,
      type: this.addUserForm.value.type,
      longueur: this.addUserForm.value.longueur,
      colorPrices: this.colorPrices.value
    };

    this.articlesService.addArticle(formData).subscribe({
      next: () => {
        this.snackbarService.show('Article enregistré avec succès');
        this.router.navigateByUrl('/user/view-articles');
      },
      error: (err) => {
        const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
        this.snackbarService.show("Erreur: " + errorMessage);
      }
    });
  }

  goBack() {
    this.router.navigateByUrl('/user/view-articles');
  }
}
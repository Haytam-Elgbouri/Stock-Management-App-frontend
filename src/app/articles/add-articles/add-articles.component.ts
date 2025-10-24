import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-add-articles',
  standalone: false,
  templateUrl: './add-articles.component.html',
  styleUrl: './add-articles.component.css'
})
export class AddArticlesComponent implements OnInit{

  public addUserForm !: FormGroup;

  constructor(private fb : FormBuilder, 
              private articlesService : ArticlesService,
              private snackbarService : SnackbarService,
              private router : Router
            ){}

  ngOnInit(): void {
    this.addUserForm = this.fb.group(
      {
        reference : this.fb.control('', Validators.required),
        designation : this.fb.control('', Validators.required),
        family : this.fb.control('', Validators.required),
        type : this.fb.control('', Validators.required),
        longueur : this.fb.control('', Validators.required)
      }
    )
    this.addUserForm.get('family')?.valueChanges.subscribe(value => {
        const longueurControl = this.addUserForm.get('longueur');
    if (value == 1) {
      longueurControl?.setValidators([Validators.required]);
    }
    else {
      longueurControl?.setValue(null);
      longueurControl?.clearValidators();
    }
    longueurControl?.updateValueAndValidity();
  });
  }

  confirm() {
    const formData = {
      reference : this.addUserForm.value.reference,
      designation : this.addUserForm.value.designation,
      family : this.addUserForm.value.family,
      type : this.addUserForm.value.type,
      longueur : this.addUserForm.value.longueur
  }
  

    this.articlesService.addArticle(formData).subscribe({
      next: () => {
        this.snackbarService.show('Article enregistré avec succès');
        this.router.navigateByUrl('/user/view-articles');
      },
      error: err => {
        const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
        this.snackbarService.show("Erreur: " + errorMessage);
      }
    });
  }

  goBack() {
    this.router.navigateByUrl('/user/view-articles');
  }
}

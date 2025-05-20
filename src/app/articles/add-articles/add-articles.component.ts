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
        prixUnitaireHT : this.fb.control('', Validators.required),
      }
    )
  }

  confirm() {
    const formData = {
      reference : this.addUserForm.value.reference,
      designation : this.addUserForm.value.designation,
      family : this.addUserForm.value.family,
      type : this.addUserForm.value.type,
      prixUnitaireHT : this.addUserForm.value.prixUnitaireHT,
  }

    this.articlesService.addArticle(formData).subscribe({
      next: () => {
        this.snackbarService.show('Utilisateur enregistré avec succès');
        this.router.navigateByUrl('/user/admin/dashboard');
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

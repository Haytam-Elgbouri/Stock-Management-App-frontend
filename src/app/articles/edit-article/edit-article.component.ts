import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-edit-article',
  standalone: false,
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.css'
})
export class EditArticleComponent implements OnInit{

  public updateUserForm !: FormGroup;
  public articleID! : string;
  public articleData! : any;

  constructor(private fb : FormBuilder, 
              private activatedRoute : ActivatedRoute,
              private articlesService : ArticlesService,
              private router : Router,
              private snackbarService : SnackbarService
            ){}

  
  ngOnInit(): void {
    this.articleID = this.activatedRoute.snapshot.params['id'];
    this.initForm();
    this.loadUserData();
  }

  private initForm(): void {
    this.updateUserForm = this.fb.group({
      reference: ['', Validators.required],
      designation: ['', Validators.required],
      family: ['', Validators.required],
      type: ['', Validators.required],
      prixUnitaireHT: ['', Validators.required],
    });
  }

  private loadUserData(): void {
    this.articlesService.getArticle(this.articleID).subscribe({
      next: (data) => {
        this.articleData = data;
        this.updateUserForm.patchValue(this.articleData);
      },
      error: err => {
        const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
        this.snackbarService.show("Erreur: " + errorMessage);
      }
    });
  }

  confirm() {
    const formData = {
      reference: this.updateUserForm.value.reference,
      designation: this.updateUserForm.value.designation,
      family: this.updateUserForm.value.family,
      type: this.updateUserForm.value.type,
      prixUnitaireHT: this.updateUserForm.value.prixUnitaireHT,
    }
    this.articlesService.updateArticle(formData, this.articleID).subscribe(
      {
        next : () => {
          this.snackbarService.show("Informations de l'article mises à jour avec succès");
          this.router.navigateByUrl('/user/view-articles');
        },
        error : err =>{
          const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
          this.snackbarService.show("Erreur: " + errorMessage);
        }
      }
    )
  }
  
  goBack() {
    this.router.navigateByUrl('/user/view-articles');
  }
}

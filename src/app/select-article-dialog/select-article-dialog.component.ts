import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Article } from '../models/articles.model';
import { ArticlesService } from '../services/articles.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-select-article-dialog',
  standalone: false,
  templateUrl: './select-article-dialog.component.html',
  styleUrl: './select-article-dialog.component.css'
})
export class SelectArticleDialogComponent implements OnInit {
articleForm: FormGroup;
  availableColors: string[] = ['Brut', 'Noir', 'Givre hors standard', 'Naturel'];
  articles: any[] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['select', 'reference', 'designation', 'family', 'type', 'prixUnitaireHT'];

  selectedArticleId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private articlesService: ArticlesService,
    public dialogRef: MatDialogRef<SelectArticleDialogComponent>
  ) {
    this.articleForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
      color: ['Brut', Validators.required],
      selected: ['', Validators.required]
    });

    this.dataSource = new MatTableDataSource<any>();
  }
ngOnInit(): void {
  this.articlesService.getArticles().subscribe({
    next: (data) => {
      this.articles = data;
      this.dataSource.data = this.articles; // ⬅️ Make sure it's set here
      console.log('Articles loaded:', this.articles); // for debugging
    },
    error: (err) => {
      console.error("Erreur de chargement des articles", err);
      alert("Erreur lors du chargement des articles.");
    }
  });
}


onSubmit(): void {
  if (this.articleForm.invalid) return;

  const selectedArticleId = this.articleForm.value.selected;
  const selectedArticle = this.articles.find(a => a.id === selectedArticleId);
  if (!selectedArticle) return;

  const result = {
    ...selectedArticle,
    quantity: this.articleForm.value.quantity,
    color: this.articleForm.value.color
  };

  this.dialogRef.close(result);
}


  onCancel(): void {
    this.dialogRef.close();
  }

  onSelectArticle(articleId: number) {
  this.articleForm.get('selected')?.setValue(articleId);
}
applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
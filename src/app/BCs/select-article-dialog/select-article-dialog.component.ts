import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Article } from '../../models/articles.model';
import { ArticlesService } from '../../services/articles.service';
import { MatTableDataSource } from '@angular/material/table';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-select-article-dialog',
  standalone: false,
  templateUrl: './select-article-dialog.component.html',
  styleUrl: './select-article-dialog.component.css'
})
export class SelectArticleDialogComponent implements OnInit {
  articleForm: FormGroup;
  availableColors: any[] = []; // ⬅️ Colors for selected article
  articles: any[] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['select', 'reference', 'designation', 'family', 'type'];

  selectedArticleId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private articlesService: ArticlesService,
    public dialogRef: MatDialogRef<SelectArticleDialogComponent>
  ) {
    this.articleForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
      color: ['', Validators.required],
      selected: ['', Validators.required]
    });

    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe({
      next: (data) => {
        this.articles = data;
        this.dataSource.data = this.articles;
        console.log('Articles loaded:', this.articles);
      },
      error: (err) => {
        console.error("Erreur de chargement des articles", err);
        alert("Erreur lors du chargement des articles.");
      }
    });
  }

  onSelectArticle(articleId: number) {
    this.articleForm.get('selected')?.setValue(articleId);
    
    // Load colors for selected article
    const selectedArticle = this.articles.find(a => a.id === articleId);
    if (selectedArticle && selectedArticle.colorPrices) {
      this.availableColors = selectedArticle.colorPrices.map((cp: any) => ({
        id: cp.colorId,
        name: cp.colorName
      }));
      
      // Reset color selection when article changes
      this.articleForm.get('color')?.setValue('');
    }
  }

  onSubmit(): void {
    if (this.articleForm.invalid) return;

    const selectedArticleId = this.articleForm.value.selected;
    const selectedArticle = this.articles.find(a => a.id === selectedArticleId);
    if (!selectedArticle) return;

    // Find the selected color's price information
    const selectedColorId = this.articleForm.value.color;
    const selectedColorPrice = selectedArticle.colorPrices?.find(
      (cp: any) => cp.colorName === selectedColorId
    );
    const prixTotalHT = selectedColorPrice?.prixTotalHT * this.articleForm.value.quantity;
    
    const result = {
      ...selectedArticle,
      quantity: this.articleForm.value.quantity,
      color: selectedColorId,
      colorName: selectedColorPrice?.colorName,
      // prixTotalHT: selectedColorPrice?.prixTotalHT || 0
      prixTotalHT: prixTotalHT
    };

    this.dialogRef.close(result);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
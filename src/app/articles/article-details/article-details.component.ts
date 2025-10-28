import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-article-details',
  standalone: false,
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent implements OnInit{

  public articleId! : number;
  public articleData : any;
  public colorPrices : any;
  public displayedColumns = ["colorName", "prixUnitaireHT", "prixTotalHT"];
  public dataSource : any;

  constructor(private articlesService : ArticlesService,
              private snackbarService : SnackbarService,
              private activatedRoute : ActivatedRoute 
  ){}

  ngOnInit(): void {
    this.articleId = this.activatedRoute.snapshot.params['id'];
    this.articlesService.getArticle(this.articleId).subscribe({
      next : data =>{
        this.articleData = data;
        this.colorPrices = data.colorPrices;
        this.dataSource = new MatTableDataSource(this.colorPrices);
      },
      error : err =>{
        const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
        this.snackbarService.show("Erreur: " + errorMessage);
      }
    })
  }

}

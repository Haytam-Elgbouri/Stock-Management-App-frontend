import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { BcsService } from '../../services/bcs.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ArticlesService } from '../../services/articles.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Article } from '../../models/articles.model';
import { SelectArticleDialogComponent } from '../../select-article-dialog/select-article-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-bc',
  standalone: false,
  templateUrl: './add-bc.component.html',
  styleUrl: './add-bc.component.css'
})
export class AddBCComponent implements OnInit{

  public bcForm! : FormGroup; 
  public dataSource = new MatTableDataSource<any>();
  public addedArticles: any[] = []; // your custom list

  public articles!:any;
  public displayedColumns: string[] = [
    'id', 'reference', 'designation', 'family', 'type', 'prixUnitaireHT',
    'color', 'quantity'
  ];

  constructor(private fb : FormBuilder ,
              private bcsService : BcsService,
              private articlesService : ArticlesService,
              private snackbarService : SnackbarService,
              private dialog: MatDialog){}


  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
  this.bcForm = this.fb.group({
    reference: this.fb.control('', Validators.required),
    supplierReference: this.fb.control('', Validators.required),
  });

}

openAddArticleDialog(): void {
  const dialogRef = this.dialog.open(SelectArticleDialogComponent, {
    width: '600px',
    data: { articles: this.articles } // all available articles
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Try to find an existing line with same article id AND color
      const existingLine = this.addedArticles.find(a => a.id === result.id && a.color === result.color);

      if (existingLine) {
        // If found, increase quantity
        existingLine.quantity += result.quantity;
      } else {
        // Otherwise add new line
        this.addedArticles.push(result);
      }

      // Refresh table data source
      this.dataSource.data = [...this.addedArticles];
    }
  });
}



confirm() {
  const formData = {
    reference: this.bcForm.value.reference,
    supplierReference: this.bcForm.value.supplierReference,
    lignes: this.addedArticles.map(a => ({
      article: { id: a.id },
      quantity: a.quantity,
      color: a.color
    }))
  };

  this.bcsService.addBC(formData).subscribe({
    next: () => {
      this.snackbarService.show('Bon de commande enregistré avec succès');

      // Reset form
      this.bcForm.reset();

      // Clear added articles and table
      this.addedArticles = [];
      this.dataSource.data = [];

      if (this.paginator) this.paginator.firstPage();

    },
    error: err => {
      const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
      this.snackbarService.show("Erreur: " + errorMessage);
    }
  });
}



}

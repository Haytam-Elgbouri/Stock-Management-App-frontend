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
import { DisplayArticle } from '../../models/displayArticle.model';

@Component({
  selector: 'app-add-bc',
  standalone: false,
  templateUrl: './add-bc.component.html',
  styleUrl: './add-bc.component.css'
})
export class AddBCComponent implements OnInit{

  public bcForm! : FormGroup; 
  public dataSource : any;
  public articles!:any;
  public displayedColumns: string[] = [
    'validation', 'id', 'reference', 'designation', 'family', 'type', 'prixUnitaireHT',
    'color', 'quantity'
  ];
  colorOptions = ['Brut', 'Noir', 'Givre hors standard', 'Naturel'];
  public selection = new SelectionModel<any>(true, []);

  constructor(private fb : FormBuilder , private bcsService : BcsService, private articlesService : ArticlesService, private snackbarService : SnackbarService){}
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
  // Initialize the form
  this.bcForm = this.fb.group({
    reference: this.fb.control('', Validators.required),
    supplierReference: this.fb.control('', Validators.required),
  });

  // Fetch articles and enrich with quantity and color
  this.articlesService.getArticles().subscribe({
    next: (data: Article[]) => {
      // Add quantity and color to each article
      this.articles = data.map((a: Article): DisplayArticle => ({
        ...a,
        quantity: 1,
        color: 'Brut'
      }));

      // Set up dataSource with MatTableDataSource
      this.dataSource = new MatTableDataSource<DisplayArticle>(this.articles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error: err => {
      const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
      this.snackbarService.show("Erreur: " + errorMessage);
    }
  });
}


  

  confirm() {
  const selectedArticles = this.selection.selected;

  if (selectedArticles.length === 0) {
    this.snackbarService.show('Veuillez sélectionner au moins un article à ajouter');
    return;
  }

  const lignes = selectedArticles.map(row => ({
    articleId: row.id,
    color: row.color,
    quantity: row.quantity
  }));

  const formData = {
    reference: this.bcForm.value.reference,
    supplierReference: this.bcForm.value.supplierReference,
    date: new Date().toISOString().split('T')[0], // or this.bcForm.value.date if you have one
    lignes: lignes
  };

  console.log('Payload to send:', formData);

  this.bcsService.addBC(formData).subscribe({
    next: () => {
      this.snackbarService.show('Paiement client enregistré avec succès');
      this.ngOnInit();
    },
    error: err => {
      const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
      this.snackbarService.show("Erreur: " + errorMessage);
    }
  });
}




     /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    if (!this.dataSource || !this.dataSource.data) {
      return false;
    }
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!this.dataSource || !this.dataSource.data) {
      return '';
    }
  
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
  
    const index = this.dataSource.data.indexOf(row) + 1;
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${index}`;
  }
}

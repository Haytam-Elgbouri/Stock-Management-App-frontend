import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectArticleDialogComponent } from '../../BCs/select-article-dialog/select-article-dialog.component';
import { BcsService } from '../../services/bcs.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ClientBcService } from '../../services/client-bc.service';

@Component({
  selector: 'app-add-bc-client',
  standalone: false,
  templateUrl: './add-bc-client.component.html',
  styleUrl: './add-bc-client.component.css'
})
export class AddBcClientComponent implements OnInit{

  public bcForm! : FormGroup; 
  public dataSource = new MatTableDataSource<any>();
  public addedArticles: any[] = []; // your custom list
  public articles!:any;
  public displayedColumns: string[] = [
    'reference', 'designation', 'family', 'type',
    'color', 'quantity', 'prixUnitaireHT'
  ];

  constructor(private fb : FormBuilder ,
              private clientBcService : ClientBcService,
              private snackbarService : SnackbarService,
              private dialog: MatDialog){}


  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
  this.bcForm = this.fb.group({
    reference: this.fb.control('', Validators.required),
    client: this.fb.control('', Validators.required),
  });

  }

  openAddArticleDialog(): void {
    const dialogRef = this.dialog.open(SelectArticleDialogComponent, {
      width: '70vw',    // 70% of the viewport width
      height: '70vh',   // 70% of the viewport height (optional)
      maxWidth: '95vw', // prevent overflow on small screens
      maxHeight: '95vh',
      data: { articles: this.articles }
    });

    dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const existingLine = this.addedArticles.find(
        a => a.id === result.id && a.color === result.color
      );

      if (existingLine) {
        existingLine.quantity += result.quantity;
      } else {
        this.addedArticles.push(result);
      }

      this.dataSource.data = [...this.addedArticles];
    }
  });
  }




  confirm() {
    const formData = {
      reference: this.bcForm.value.reference,
      client: this.bcForm.value.client,
      lines: this.addedArticles.map(a => ({
        article: { id: a.id },
        quantity: a.quantity,
        color: { id: a.color }
      }))
    };

    this.clientBcService.addClientBC(formData).subscribe({
      next: () => {
        this.snackbarService.show('Bon de commande client enregistré avec succès');

        this.bcForm.reset();

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

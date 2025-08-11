import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { ArticlesService } from '../../services/articles.service';
import { SnackbarService } from '../../services/snackbar.service';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-view-stock',
  standalone: false,
  templateUrl: './view-stock.component.html',
  styleUrl: './view-stock.component.css'
})
export class ViewStockComponent implements OnInit{
 public displayedColumns = ["reference", "designation", "family", "type","color","prixUnitaireHT", "quantity"];
 public dataSource : any;

  public users : any;

  constructor(private snackbarService : SnackbarService,
              private stockService : StockService) { }

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.stockService.getStock()
      .subscribe({
        next : data => {
          this.users = data

          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error : err =>{
          const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
          this.snackbarService.show("Erreur: " + errorMessage);
        }
      })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 

}

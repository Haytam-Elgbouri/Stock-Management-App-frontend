import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { SnackbarService } from '../../services/snackbar.service';
import { BcsService } from '../../services/bcs.service';

@Component({
  selector: 'app-view-bcs',
  standalone: false,
  templateUrl: './view-bcs.component.html',
  styleUrl: './view-bcs.component.css'
})
export class ViewBCsComponent {

  public displayedColumns = ['id','reference','date','supplierReference','prixTotalHT','action'];
  public dataSource:any;

  public BCs : any;

  constructor(private router: Router, private snackbarService : SnackbarService, private bcsService : BcsService) { }

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.bcsService.getBCs()
      .subscribe({
        next : data => {
          this.BCs = data

          this.dataSource = new MatTableDataSource(this.BCs);
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

  consultBC(element: any) {
    this.router.navigateByUrl(`/user/bc-details/${element.id}`)
  }

  addBC() {
    this.router.navigateByUrl("/user/add-bc")
  }
}

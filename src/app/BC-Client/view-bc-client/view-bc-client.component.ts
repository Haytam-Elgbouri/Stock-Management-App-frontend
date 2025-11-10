import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BcsService } from '../../services/bcs.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ClientBcService } from '../../services/client-bc.service';

@Component({
  selector: 'app-view-bc-client',
  standalone: false,
  templateUrl: './view-bc-client.component.html',
  styleUrl: './view-bc-client.component.css'
})
export class ViewBcClientComponent implements OnInit{

  public displayedColumns = ['reference','date','client','prixTotalHT','action'];
  public dataSource:any;

  public ClientBCs : any;

  constructor(private router: Router, private snackbarService : SnackbarService, private clientBcService : ClientBcService) { }

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.clientBcService.getAllClientBCs()
      .subscribe({
        next : data => {
          this.ClientBCs = data

          this.dataSource = new MatTableDataSource(this.ClientBCs);
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

  consultClientBC(element: any) {
    this.router.navigateByUrl(`/user/client-bc-details/${element.id}`)
  }

  addClientBC() {
    this.router.navigateByUrl("/user/add-client-bc")
  }
}

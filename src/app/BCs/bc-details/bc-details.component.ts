import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BcsService } from '../../services/bcs.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-bc-details',
  standalone: false,
  templateUrl: './bc-details.component.html',
  styleUrl: './bc-details.component.css'
})
export class BcDetailsComponent implements OnInit{

  constructor(private router : Router, private bcsService : BcsService, private activatedRoute : ActivatedRoute, private snackbarService : SnackbarService){}
  public bcs!: any;
  public dataSource:any;
  public displayedColumns = ['articleID','color','quantity'];
  private bcID!:number;
  public lines!:[];
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.bcID = this.activatedRoute.snapshot.params['id'];
    this.bcsService.getBC(this.bcID).subscribe({
      next : data =>{
          this.bcs = data
          this.lines = this.bcs.lignes;
          this.dataSource = new MatTableDataSource(this.lines);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      },
      error : err =>{
          const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
          this.snackbarService.show("Erreur: " + errorMessage);
      }
    })
  }


  goBack() {
    this.router.navigateByUrl('/user/view-bcs');
  }
}

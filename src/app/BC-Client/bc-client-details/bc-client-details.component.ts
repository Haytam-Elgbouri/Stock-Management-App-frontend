import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AddBrDialogComponent } from '../../add-br-dialog/add-br-dialog.component';
import { BcsService } from '../../services/bcs.service';
import { BrsService } from '../../services/brs.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ClientBcService } from '../../services/client-bc.service';

@Component({
  selector: 'app-bc-client-details',
  standalone: false,
  templateUrl: './bc-client-details.component.html',
  styleUrl: './bc-client-details.component.css'
})
export class BcClientDetailsComponent implements OnInit{

  constructor(private router : Router,
              private clientBcService : ClientBcService,
              private activatedRoute : ActivatedRoute,
              private snackbarService : SnackbarService
            ){}
  public bcs!: any;
  public dataSource:any;
  public displayedColumns = ['reference', 'designation', 'prixUnitaireHT','quantity', 'prixTotalLigne','color','delivered','remaining'];
  // public brsDataSource:any;
  // public brsBisplayedColumns = ['reference', 'date', 'status', 'action'];
  public clientBcID!:number;
  // public brID!:number;
  public lines!:[];
  // public brs!:[];
  // public brsLength! : number;

  @ViewChild(MatPaginator) bcPaginator! : MatPaginator;
  @ViewChild(MatSort) bcSort!: MatSort;

  @ViewChild(MatPaginator) brPaginator! : MatPaginator;
  @ViewChild(MatSort) brSort!: MatSort;

  ngOnInit(): void {
    this.clientBcID = this.activatedRoute.snapshot.params['id'];
    this.clientBcService.getClientBCById(this.clientBcID).subscribe({
      next : data =>{
          this.bcs = data
          this.lines = this.bcs.lines;
          // this.brs = this.bcs.brs;
          // this.brsLength = this.brs.length;
          
          this.dataSource = new MatTableDataSource(this.lines);
          this.dataSource.paginator = this.bcPaginator;
          this.dataSource.sort = this.bcSort;

          // this.brsDataSource = new MatTableDataSource(this.brs);
          // this.brsDataSource.paginator = this.brPaginator;
          // this.brsDataSource.sort = this.brSort;
      },
      error : err =>{
          const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
          this.snackbarService.show("Erreur: " + errorMessage);
      }
    })
  }

  goBack() {
    this.router.navigateByUrl('/user/view-client-bcs');
  }

}

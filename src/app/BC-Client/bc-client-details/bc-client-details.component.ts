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
import { BlsService } from '../../services/bls.service';

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
              private snackbarService : SnackbarService,
              private dialog : MatDialog,
              private blsService : BlsService
            ){}
  public bcs!: any;
  public dataSource:any;
  public displayedColumns = ['reference', 'designation', 'prixUnitaireHT','quantity', 'prixTotalLigne','color','delivered','remaining'];
  public blsDataSource:any;
  public blsBisplayedColumns = ['reference', 'date', 'status', 'action'];
  public clientBcID!:number;
  public blID!:number;
  public lines!:[];
  public bls!:[];
  public blsLength! : number;

  @ViewChild(MatPaginator) bcPaginator! : MatPaginator;
  @ViewChild(MatSort) bcSort!: MatSort;

  @ViewChild(MatPaginator) blPaginator! : MatPaginator;
  @ViewChild(MatSort) blSort!: MatSort;

  ngOnInit(): void {
    this.clientBcID = this.activatedRoute.snapshot.params['id'];
    this.clientBcService.getClientBCById(this.clientBcID).subscribe({
      next : data =>{
          this.bcs = data
          this.lines = this.bcs.lines;
          this.bls = this.bcs.bls;
          this.blsLength = this.bls.length;
          
          this.dataSource = new MatTableDataSource(this.lines);
          this.dataSource.paginator = this.bcPaginator;
          this.dataSource.sort = this.bcSort;

          this.blsDataSource = new MatTableDataSource(this.bls);
          this.blsDataSource.paginator = this.blPaginator;
          this.blsDataSource.sort = this.blSort;
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

  
  consultBL(element: any) {
    this.router.navigateByUrl(`/user/bl-details/${element.id}`)
  }

  addBL() {
    const dialogRef = this.dialog.open(AddBrDialogComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(reference => {
      if (reference) {
        const formData = { reference };

        this.blsService.addBl(this.clientBcID, formData).subscribe({
          next: data => {
            this.snackbarService.show("BR créé avec succès !");
            this.blID = data.id;
            this.router.navigateByUrl(`/user/bl-details/${this.blID}`);
          },
          error: err => {
            const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
            this.snackbarService.show("Erreur: " + errorMessage);
          }
        });
      }
    });
  }


}

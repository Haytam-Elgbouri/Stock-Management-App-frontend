import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BcsService } from '../../services/bcs.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../services/snackbar.service';
import { elementAt } from 'rxjs';
import { BlsService } from '../../services/bls.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBlDialogComponent } from '../../add-bl-dialog/add-bl-dialog.component';

@Component({
  selector: 'app-bc-details',
  standalone: false,
  templateUrl: './bc-details.component.html',
  styleUrl: './bc-details.component.css'
})
export class BcDetailsComponent implements OnInit{
  
  constructor(private router : Router,
              private bcsService : BcsService,
              private activatedRoute : ActivatedRoute,
              private snackbarService : SnackbarService,
              private blsService : BlsService,
              private dialog: MatDialog
            ){}
  public bcs!: any;
  public dataSource:any;
  public displayedColumns = ['reference', 'designation', 'prixUnitaireHT', 'prixTotalLigne','color','quantity','remaining','delivered'];
  public blsDataSource:any;
  public blsBisplayedColumns = ['reference', 'action'];
  public bcID!:number;
  public blID!:number;
  public lines!:[];
  public bls!:[];

  @ViewChild(MatPaginator) bcPaginator! : MatPaginator;
  @ViewChild(MatSort) bcSort!: MatSort;

  @ViewChild(MatPaginator) blPaginator! : MatPaginator;
  @ViewChild(MatSort) blSort!: MatSort;

  ngOnInit(): void {
    this.bcID = this.activatedRoute.snapshot.params['id'];
    this.bcsService.getBC(this.bcID).subscribe({
      next : data =>{
          this.bcs = data
          this.lines = this.bcs.lines;
          this.bls = this.bcs.bls;
          this.dataSource = new MatTableDataSource(this.lines);
          this.dataSource.paginator = this.bcPaginator;
          this.dataSource.sort = this.bcSort;

          this.blsDataSource = new MatTableDataSource(this.bls);
          // this.blsDataSource.paginator = this.blPaginator;
          // this.blsDataSource.sort = this.blSort;
      },
      error : err =>{
          const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
          this.snackbarService.show("Erreur: " + errorMessage);
      }
    })
  }

  // deliver(element: any){
  //   const formData = {
  //     id: element.id,
  //     deliveredQuantity: element.deliveredQuantity
  //   };
  //   console.log(formData);
    
  //   this.bcsService.deliver(formData).subscribe({
  //     next : () =>{
  //       this.snackbarService.show("Delivered");
  //       this.ngOnInit();
  //     },
  //     error : err =>{
  //       const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
  //       this.snackbarService.show("Erreur: " + errorMessage);
  //     }
  //   })

  // }


  goBack() {
    this.router.navigateByUrl('/user/view-bcs');
  }
  
  consultBL(element: any) {
    this.router.navigateByUrl(`/user/bl-details/${element.id}`)
  }

addBL() {
  const dialogRef = this.dialog.open(AddBlDialogComponent, {
    width: '400px',
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(reference => {
    if (reference) {
      const formData = { reference };

      this.blsService.addBl(this.bcID, formData).subscribe({
        next: data => {
          this.snackbarService.show("BL créé avec succès !");
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BcsService } from '../../services/bcs.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../services/snackbar.service';
import { elementAt } from 'rxjs';
import { BrsService } from '../../services/brs.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBrDialogComponent } from '../../add-br-dialog/add-br-dialog.component';

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
              private brsService : BrsService,
              private dialog: MatDialog
            ){}
  public bcs!: any;
  public dataSource:any;
  public displayedColumns = ['reference', 'designation', 'prixUnitaireHT','quantity', 'prixTotalLigne','color','received','remaining'];
  public brsDataSource:any;
  public brsBisplayedColumns = ['reference', 'date', 'status', 'action'];
  public bcID!:number;
  public brID!:number;
  public lines!:[];
  public brs!:[];
  public brsLength! : number;

  @ViewChild(MatPaginator) bcPaginator! : MatPaginator;
  @ViewChild(MatSort) bcSort!: MatSort;

  @ViewChild(MatPaginator) brPaginator! : MatPaginator;
  @ViewChild(MatSort) brSort!: MatSort;

  ngOnInit(): void {
    this.bcID = this.activatedRoute.snapshot.params['id'];
    this.bcsService.getBC(this.bcID).subscribe({
      next : data =>{
          this.bcs = data
          this.lines = this.bcs.lines;
          this.brs = this.bcs.brs;
          this.brsLength = this.brs.length;
          
          this.dataSource = new MatTableDataSource(this.lines);
          this.dataSource.paginator = this.bcPaginator;
          this.dataSource.sort = this.bcSort;

          this.brsDataSource = new MatTableDataSource(this.brs);
          // this.brsDataSource.paginator = this.brPaginator;
          // this.brsDataSource.sort = this.brSort;
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
  //     receivedQuantity: element.receivedQuantity
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
  
  consultBR(element: any) {
    this.router.navigateByUrl(`/user/br-details/${element.id}`)
  }

addBR() {
  const dialogRef = this.dialog.open(AddBrDialogComponent, {
    width: '400px',
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(reference => {
    if (reference) {
      const formData = { reference };

      this.brsService.addBr(this.bcID, formData).subscribe({
        next: data => {
          this.snackbarService.show("BR créé avec succès !");
          this.brID = data.id;
          this.router.navigateByUrl(`/user/br-details/${this.brID}`);
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

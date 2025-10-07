import { Component, OnInit, ViewChild } from '@angular/core';
import { BlsService } from '../../services/bls.service';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bl-details',
  standalone: false,
  templateUrl: './bl-details.component.html',
  styleUrl: './bl-details.component.css'
})
export class BlDetailsComponent implements OnInit{


  private blID! : number;
  public bl : any;
  public lines! : [];
  public dataSource : any; 
  public displayedColumns = ['reference', 'designation','color','quantity','remainingBefore','delivered', 'remainingAfter', 'deliver'];
  @ViewChild(MatPaginator) Paginator! : MatPaginator;
  @ViewChild(MatSort) Sort!: MatSort;

  constructor(private blService : BlsService,
              private activatedRoute : ActivatedRoute,
              private snackbarService : SnackbarService,
              private location : Location
  ){}

  ngOnInit(): void {
    this.blID = this.activatedRoute.snapshot.params['id'];
    this.blService.getBl(this.blID).subscribe({
      next : data =>{
        this.bl = data;
        this.lines = this.bl.lines;
        this.dataSource = new MatTableDataSource(this.lines);
        this.dataSource.paginator = this.Paginator;
        this.dataSource.sort = this.Sort;
      },
      error : err =>{
          const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
          this.snackbarService.show("Erreur: " + errorMessage);
      }
    })
  }

  deliver(element: any){
    const formData = {
      id: element.id,
      deliveredQuantity: element.deliveredQuantity
    };
    console.log(formData);
    
    this.blService.deliver(formData).subscribe({
      next : () =>{
        this.snackbarService.show("Delivered");
        this.ngOnInit();
      },
      error : err =>{
        const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
        this.snackbarService.show("Erreur: " + errorMessage);
      }
    })

  }

  goBack() {
    this.location.back();
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { BrsService } from '../../services/brs.service';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Location } from '@angular/common';

@Component({
  selector: 'app-br-details',
  standalone: false,
  templateUrl: './br-details.component.html',
  styleUrl: './br-details.component.css'
})
export class BrDetailsComponent implements OnInit{


  private brID! : number;
  public br : any;
  public lines! : [];
  public dataSource : any; 
  public displayedColumns = ['reference', 'designation','color','quantity','remainingBefore','received', 'remainingAfter', 'deliver'];
  @ViewChild(MatPaginator) Paginator! : MatPaginator;
  @ViewChild(MatSort) Sort!: MatSort;

  constructor(private brService : BrsService,
              private activatedRoute : ActivatedRoute,
              private snackbarService : SnackbarService,
              private location : Location
  ){}

  ngOnInit(): void {
    this.brID = this.activatedRoute.snapshot.params['id'];
    this.brService.getBr(this.brID).subscribe({
      next : data =>{
        this.br = data;
        this.lines = this.br.lines;
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

deliver() {
  if (!this.lines || this.lines.length === 0) return;

  // Prepare the payload for the whole BR
  const formData = {
    brId: this.brID,
    lines: this.lines.map((line: any) => ({
      id: line.id,
      receivedQuantity: line.receivedQuantity || 0 // default 0 if undefined
    }))
  };

  console.log('Delivering BR:', formData);

  this.brService.receive(formData).subscribe({
    next: () => {
      this.snackbarService.show("BR Delivered");
      this.ngOnInit(); // Refresh the data
    },
    error: err => {
      const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
      this.snackbarService.show("Erreur: " + errorMessage);
    }
  });
}


  validate(){
    this.brService.validate(this.brID).subscribe({
      next : () =>{
        this.snackbarService.show("BR valide");
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { ColorService } from '../../services/color.service';
import { SnackbarService } from '../../services/snackbar.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddColorDialogComponent } from '../add-color-dialog/add-color-dialog.component';

@Component({
  selector: 'app-view-colors',
  standalone: false,
  templateUrl: './view-colors.component.html',
  styleUrl: './view-colors.component.css'
})
export class ViewColorsComponent implements OnInit{
  
  
  public colors = [];
  public dataSource : any; 
  public displayedColumns = ['name', 'action'];
  
  constructor(private colorService : ColorService,
    private snackbarService : SnackbarService,
    private dialog: MatDialog
  ){}
  
  
  ngOnInit(): void {
    this.colorService.viewColors().subscribe({
      next : data =>{
        this.colors = data;
        
        this.dataSource = new MatTableDataSource(this.colors);
        
      },
      error : err =>{
        const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
        this.snackbarService.show("Erreur: " + errorMessage);
      }
    })
  }
  
  addColor() {
  const dialogRef = this.dialog.open(AddColorDialogComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // result is the color name returned from the dialog
      this.colorService.addColor({ name: result }).subscribe({
        next: () => {
          this.snackbarService.show(`Couleur "${result}" ajoutée avec succès`);
          this.ngOnInit();
        },
        error: err => {
          const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
          this.snackbarService.show("Erreur: " + errorMessage);
        }
      });
    }
  });
}


  onDelete(element: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { name: `${element.firstName} ${element.lastName}` }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.colorService.deleteColor(element.id).subscribe({
          next: () => {
            this.snackbarService.show(`${element.reference} : article supprimé avec succès`);
            this.ngOnInit();
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

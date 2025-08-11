import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-view-articles',
  standalone: false,
  templateUrl: './view-articles.component.html',
  styleUrl: './view-articles.component.css'
})
export class ViewArticlesComponent implements OnInit{

  public displayedColumns = ["reference", "designation", "family", "type", "prixUnitaireHT","action"];
 public dataSource : any;

  public users : any;

  constructor(private router: Router, private snackbarService : SnackbarService,   private dialog: MatDialog, private articlesService : ArticlesService) { }

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.articlesService.getArticles()
      .subscribe({
        next : data => {
          this.users = data

          this.dataSource = new MatTableDataSource(this.users);
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

  onDelete(element: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { name: `${element.firstName} ${element.lastName}` }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.articlesService.deleteArticle(element.id).subscribe({
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
  

  onEdit(element: any) {
    this.router.navigateByUrl(`/user/edit-article/${element.id}`)
  }

  addUser() {
    this.router.navigateByUrl("/user/add-article")
  }

}

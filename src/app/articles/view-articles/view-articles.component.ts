import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view-articles',
  standalone: false,
  templateUrl: './view-articles.component.html',
  styleUrl: './view-articles.component.css'
})
export class ViewArticlesComponent implements OnInit{

  public displayedColumns = ["id", "reference", "designation", "family", "type", "prixUnitaireHT","action"];
  public dataSource: any;
  public totalElements = 0;
  public pageSize = 2;
  public pageIndex = 0;

  public users : any;

  constructor(private router: Router, private snackbarService : SnackbarService,   private dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.pageIndex = 0;
    this.fetchPaginatedData();
  }
  



fetchPaginatedData(): void {
  if (this.pageIndex < 0 || this.pageSize <= 0) {
    this.snackbarService.show("Pagination invalide");
    return;
  }

  // this.authService.getUsersPaginated(this.pageIndex, this.pageSize)
  //   .subscribe({
  //     next: response => {
  //       const { content = [], totalElements = 0 } = response;

  //       const usersWithFormattedRoles = content.map((user: any) => ({
  //         ...user,
  //         role: user.role?.startsWith("ROLE_")
  //           ? user.role.substring(5).toLowerCase()
  //           : user.role ?? 'inconnu'
  //       }));

  //       this.dataSource = new MatTableDataSource(usersWithFormattedRoles);

  //       this.totalElements = totalElements;
  //     },
  //     error: err => {
  //       const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
  //       console.error("Erreur lors de la récupération des utilisateurs :", err);
  //       this.snackbarService.show("Erreur : " + errorMessage);
  //     }
  //   });
}



  // onPageChange(event: PageEvent) {
  //   this.pageIndex = event.pageIndex;
  //   this.pageSize = event.pageSize;
  //   this.fetchPaginatedData();
  // }




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
        // this.authService.deleteUser(element.id).subscribe({
        //   next: () => {
        //     this.snackbarService.show(`${element.firstName} ${element.lastName}: utilisateur supprimé avec succès`);
        //     this.ngOnInit();
        //   },
        //   error: err => {
        //     const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
        //     this.snackbarService.show("Erreur: " + errorMessage);
        //   }
        // });
      }
    });
  }
  

  onEdit(element: any) {
    this.router.navigateByUrl(`/edit-article/${element.id}`)
  }

  changeStatus(element: any) {
    element.isActive = !element.isActive;

    const formData = {
      isActive: element.isActive
    }
    // this.authService.changeUserStatus(formData, element.id).subscribe(
    //   {
    //     next : () => {
  
    //     },
    //     error : err =>{
    //       const errorMessage = err?.error?.message || "Une erreur inattendue s'est produite";
    //       this.snackbarService.show("Erreur: " + errorMessage);
    //     }
    //   }
    // )
  }

  addUser() {
    this.router.navigateByUrl("/user/add-article")
  }

}

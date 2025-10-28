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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


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

  // ⬇️ ADD THESE TWO HELPER METHODS
  getColorPrice(element: any): number {
    // Find the colorPrice that matches the element's color.id
    const colorPrice = element.article.colorPrices?.find(
      (cp: any) => cp.colorId === element.color.id
    );
    
    return colorPrice?.prixTotalHT || 0;
  }

  getColorTotalPrice(element: any): number {
    // Find the colorPrice that matches the element's color.id
    const colorPrice = element.article.colorPrices?.find(
      (cp: any) => cp.colorId === element.color.id
    );
    
    return colorPrice?.prixTotalHT || 0;
  }
  // ⬆️ END OF NEW METHODS

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




async downloadBC() {
  const doc = new jsPDF();
  const logoUrl = 'logo-white2.png';
  const date = this.bcs?.date || '';
  const reference = this.bcs?.reference || '';

  const getBase64ImageFromURL = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = (error) => reject(error);
      img.src = url;
    });
  };

  const logoBase64 = await getBase64ImageFromURL(logoUrl).catch(() => null);

  if (logoBase64) {
    doc.addImage(logoBase64, 'PNG', 10, 10, 30, 30); // (x, y, width, height)
  }

  doc.setFontSize(10);
  doc.text(`Casablanca, le ${date}`, 140, 20);

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(`BON DE COMMANDE ${reference}`, 10, 60);

  const tableData = this.lines.map((line: any) => {
    const isBarre = line.article.family === 'BARRE';
    return [
      line.article.reference || '',
      line.article.designation || '',
      line.quantity || '',
      isBarre ? (line.article.longueur || '') : '-',
      line.color?.name || '',
    ];
  });

  autoTable(doc, {
    head: [['Référence', 'Désignation', 'Quantité', 'Longueur', 'Couleur']],
    body: tableData,
    startY: 70,
    theme: 'grid',
    headStyles: { fillColor: [242, 242, 242], textColor: 0 },
    styles: { fontSize: 10, halign: 'center' },
  });

  const footerText = `Siege Maga. 186 Bd Chefchaouni Q. I. Bernoussi CASABLANCA. Tel: +212 522 351447
E-mail: scaluxsarl@gmail.com - RC. N° 560169 - IF. N° 53219907 - ICE: 003148791000039 - CNSS: 5063436`;

  const pageHeight = doc.internal.pageSize.height;
  doc.setTextColor(255, 140, 0); // Orange
  doc.setFontSize(9);
  doc.text(footerText, doc.internal.pageSize.width / 2, pageHeight - 20, {
    align: 'center',
  });

  doc.save(`Bon_de_Commande_${reference}.pdf`);
}




  
}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDivider, MatListModule } from '@angular/material/list';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { ViewArticlesComponent } from './articles/view-articles/view-articles.component';
import { AddArticlesComponent } from './articles/add-articles/add-articles.component';
import { EditArticleComponent } from './articles/edit-article/edit-article.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ViewBCsComponent } from './BCs/view-bcs/view-bcs.component';
import { AddBCComponent } from './BCs/add-bc/add-bc.component';
import { BcDetailsComponent } from './BCs/bc-details/bc-details.component';
import { ViewStockComponent } from './stock/view-stock/view-stock.component';
import { SelectArticleDialogComponent } from './select-article-dialog/select-article-dialog.component';
import { ViewBrsComponent } from './BRs/view-brs/view-brs.component';
import { BrDetailsComponent } from './BRs/br-details/br-details.component';
import { AddBrDialogComponent } from './add-br-dialog/add-br-dialog.component';
import { ViewColorsComponent } from './colors/view-colors/view-colors.component';
import { AddColorDialogComponent } from './colors/add-color-dialog/add-color-dialog.component';
import { AddColorPriceDialogComponent } from './articles/add-color-price-dialog/add-color-price-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewArticlesComponent,
    AddArticlesComponent,
    EditArticleComponent,
    ConfirmDialogComponent,
    ViewBCsComponent,
    AddBCComponent,
    BcDetailsComponent,
    ViewStockComponent,
    SelectArticleDialogComponent,
    ViewBrsComponent,
    BrDetailsComponent,
    AddBrDialogComponent,
    ViewColorsComponent,
    AddColorDialogComponent,
    AddColorPriceDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    TextFieldModule,
    MatSelectModule,
    FormsModule,     
    MatNativeDateModule,
    MatDatepickerModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

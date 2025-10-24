import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewArticlesComponent } from './articles/view-articles/view-articles.component';
import { EditArticleComponent } from './articles/edit-article/edit-article.component';
import { AddArticlesComponent } from './articles/add-articles/add-articles.component';
import { ViewBCsComponent } from './BCs/view-bcs/view-bcs.component';
import { BcDetailsComponent } from './BCs/bc-details/bc-details.component';
import { AddBCComponent } from './BCs/add-bc/add-bc.component';
import { ViewStockComponent } from './stock/view-stock/view-stock.component';
import { ViewBrsComponent } from './BRs/view-brs/view-brs.component';
import { BrDetailsComponent } from './BRs/br-details/br-details.component';
import { AddColorComponent } from './colors/add-color/add-color.component';
import { ViewColorsComponent } from './colors/view-colors/view-colors.component';

const routes: Routes = [
  {path: '', redirectTo: 'user/view-stock', pathMatch: 'full' },
  {path : "user", component : HomeComponent,
    children : [
      // { path: '', redirectTo: '/user/view-stock', pathMatch: 'full' },
      {path : "view-stock", component : ViewStockComponent},
      {path : "view-articles", component : ViewArticlesComponent},
      {path : "edit-article/:id", component : EditArticleComponent},
      {path : "add-article", component : AddArticlesComponent},
      {path : "view-bcs", component : ViewBCsComponent},
      {path : "bc-details/:id", component : BcDetailsComponent},
      {path : "add-bc", component : AddBCComponent},
      {path : "view-brs", component : ViewBrsComponent},
      {path : "br-details/:id", component : BrDetailsComponent},
      {path : "add-color", component : AddColorComponent},
      {path : "view-colors", component : ViewColorsComponent},
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

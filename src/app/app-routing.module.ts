import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewArticlesComponent } from './articles/view-articles/view-articles.component';
import { EditArticleComponent } from './articles/edit-article/edit-article.component';
import { AddArticlesComponent } from './articles/add-articles/add-articles.component';

const routes: Routes = [
  {path: '', redirectTo: 'user', pathMatch: 'full' },
  {path : "user", component : HomeComponent,
    children : [
      {path : "view-articles", component : ViewArticlesComponent},
      {path : "edit-article/:id", component : EditArticleComponent},
      {path : "add-article", component : AddArticlesComponent},
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

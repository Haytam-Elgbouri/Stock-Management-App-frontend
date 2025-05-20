import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http : HttpClient) { }

  public getArticles(): Observable<any> {
    return this.http.get<any>(`${environment.backendHost}/api/articles`, {
    });
  }
  public deleteArticle(id : string): Observable<String> {
    return this.http.delete<String>(`${environment.backendHost}/api/articles/${id}`, {
    }); 
  }

}

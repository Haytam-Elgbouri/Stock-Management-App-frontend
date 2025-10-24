import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http : HttpClient) { }

  public addColor(formData:any):Observable<any>{
    return this.http.post<any>(`${environment.backendHost}/api/colors`, formData);
  }
  
  public viewColors():Observable<any>{
    return this.http.get<any>(`${environment.backendHost}/api/colors`);
  }
 
  public deleteColor(id:number):Observable<any>{
    return this.http.delete<any>(`${environment.backendHost}/api/colors/${id}`);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BcsService {

  constructor(private http : HttpClient) { }

  public getBCs():Observable<any>{
    return this.http.get<any>(`${environment.backendHost}/api/bcs`);
  }
  public getBC(id:number):Observable<any>{
    return this.http.get<any>(`${environment.backendHost}/api/bcs/${id}`)
  }
  public addBC(formData:any):Observable<any>{
    return this.http.post<any>(`${environment.backendHost}/api/bcs`,formData);
  }
  public updateBC(formData:FormData):Observable<any>{
    return this.http.put<any>(`${environment.backendHost}/api/bcs`,formData);
  }
  public validateBC(id:number):Observable<any>{
    return this.http.put<any>(`${environment.backendHost}/api/bcs/${id}/validate`,{});
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientBcService {

  constructor(private http : HttpClient) { }

  public addClientBC(formData:any):Observable<any>{
    return this.http.post<any>(`${environment.backendHost}/api/bccs`, formData);
  }
  
  public getAllClientBCs():Observable<any>{
    return this.http.get<any>(`${environment.backendHost}/api/bccs`);
  }
  
  public getClientBCById(id : number):Observable<any>{
    return this.http.get<any>(`${environment.backendHost}/api/bccs/${id}`);
  }
}

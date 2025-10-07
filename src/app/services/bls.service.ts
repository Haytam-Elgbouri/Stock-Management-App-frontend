import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlsService {

  constructor(private http : HttpClient) { }

  public addBl(formData:any):Observable<any>{
    return this.http.post<any>(`${environment.backendHost}/api/bls`, formData);
  }

  public getBl(id:number):Observable<any>{
    return this.http.get<any>(`${environment.backendHost}/api/bls/${id}`);
  }

  public deliver(formData:any):Observable<any>{
    return this.http.post<any>(`${environment.backendHost}/api/bls/deliver`,formData);
  }
}

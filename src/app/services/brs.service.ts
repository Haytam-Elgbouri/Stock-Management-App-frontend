import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrsService {

  constructor(private http : HttpClient) { }

  public addBr(id:number ,formData:any):Observable<any>{
    return this.http.post<any>(`${environment.backendHost}/api/brs/${id}`, formData);
  }

  public getBr(id:number):Observable<any>{
    return this.http.get<any>(`${environment.backendHost}/api/brs/${id}`);
  }

  public receive(formData:any):Observable<any>{
    return this.http.post<any>(`${environment.backendHost}/api/brs/receive`,formData);
  }

  public validate(id:number):Observable<any>{
    return this.http.put<any>(`${environment.backendHost}/api/brs/validate/${id}`,{});
  }
}

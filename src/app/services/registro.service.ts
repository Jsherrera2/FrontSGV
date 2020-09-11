import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import {Registro} from '../models/registro'

@Injectable({
  providedIn: 'root'
})
export class RegistroService {


  url : string = "http://jeffersonvela-001-site1.dtempurl.com/api/Registro";
  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'      
    })
  };
  constructor(private http:HttpClient) { }


  save(e:Registro ) : Observable<any> {
    let eventoBody = JSON.stringify(e);    
    if(e.idevento === undefined){      
      return this.http.post<any>(this.url, eventoBody, this.httpOptions);
    }
    return this.http.put<any>(this.url, eventoBody, this.httpOptions);
  }

  retrieve(id:number): Observable<Registro > {
    return this.http.get<Registro >(this.url + "/" + id, this.httpOptions)
      .pipe(
        retry(1)
      );
  }

  delete(v: Registro ) : Observable<any> {
    return this.http.delete<any>(this.url + '/' + v.idevento, 
      this.httpOptions);
  }

  list(): Observable<Registro []> {
    return this.http.get<Registro []>(this.url, this.httpOptions)
      .pipe(
        retry(1)
      );
  }

}

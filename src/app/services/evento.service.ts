import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evento } from '../models/evento';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  url: string ="http://jeffersonvela-001-site1.dtempurl.com/api/Evento";

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'      
    })
  };


  constructor(private http:HttpClient) { }


  save(e:Evento) : Observable<any> {
    let eventoBody = JSON.stringify(e);    
    if(e.idevento === undefined){      
      return this.http.post<any>(this.url, eventoBody, this.httpOptions);
    }
    return this.http.put<any>(this.url, eventoBody, this.httpOptions);
  }

  retrieve(id:number): Observable<Evento> {
    return this.http.get<Evento>(this.url + "/" + id, this.httpOptions)
      .pipe(
        retry(1)
      );
  }

  delete(v: Evento) : Observable<any> {
    return this.http.delete<any>(this.url + '/' + v.idevento, 
      this.httpOptions);
  }

  list(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.url, this.httpOptions)
      .pipe(
        retry(1)
      );
  }
}

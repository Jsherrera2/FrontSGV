import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url: string ="http://jeffersonvela-001-site1.dtempurl.com/api/Categoria";

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'      
    })
  };

  constructor(private http:HttpClient) { }

  list(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url, this.httpOptions)
      .pipe(
        retry(1)
      );
  }
}

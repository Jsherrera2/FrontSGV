import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, from } from 'rxjs';
import { retry } from 'rxjs/operators';
import {Aporte} from 'src/app/models/aporte';

@Injectable({
  providedIn: 'root'
})
export class AporteService {

  url: string ="http://jeffersonvela-001-site1.dtempurl.com/api/Aporte";

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'      
    })
  };

  constructor(private http:HttpClient) { }

  list(): Observable<Aporte[]> {
    return this.http.get<Aporte[]>(this.url, this.httpOptions)
      .pipe(
        retry(1)
      );
  }
}

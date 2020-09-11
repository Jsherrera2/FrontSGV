import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  url : string = "http://jeffersonvela-001-site1.dtempurl.com/api/ReporteCate";
  url1 : string = "http://jeffersonvela-001-site1.dtempurl.com/api/ReporteGenero";
 


  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    })
  };

  constructor(private http : HttpClient) { }


  list(): Observable<any>{
    return this.http.get<any>(this.url, this.httpOptions);
  }

  list1(): Observable<any>{
    return this.http.get<any>(this.url1, this.httpOptions);
  }

  

}

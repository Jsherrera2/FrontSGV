import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Auth} from '../models/auth';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


    
  url : string = "http://jeffersonvela-001-site1.dtempurl.com/api/login";
  url1: string ="http://jeffersonvela-001-site1.dtempurl.com/api/Auth";
 
  userToken : string = "";
  
  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'      
    })
  };

  constructor(private http:HttpClient) { }

  login(usuario:string, contrasena:string) : Observable<any> {
    let userBody = JSON.stringify({ "nombre" : usuario , "contrasena" : contrasena });    
    return this.http.post<any>(this.url.concat('/authenticate'), userBody, this.httpOptions).pipe(
      map( resp => {
        localStorage.setItem('user', resp.user.nombre);
        localStorage.setItem('role', resp.user.rol);
        this.saveToken(resp.token);        
        return resp;

      })
    );    
  }

  private saveToken( idToken: string ) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let now = new Date();
    now.setSeconds(600);
    localStorage.setItem('duration', now.getTime().toString() );
  }

  isAuthenticated(): boolean {
    if (this.userToken.length < 2 ) {
      return false;
    }
    const expira = Number(localStorage.getItem('duration'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      this.logout();
      return false;
    }
  }

  hasRole(allowedRoles : Array<string>): boolean {    
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));    
    var userRole = payLoad.rol;
    console.log(userRole);
    return allowedRoles.indexOf(userRole) !== -1;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('duration');
  }





  save(v:Auth) : Observable<any> {
    let voluntarioBody = JSON.stringify(v);    
    if(v.idusuario === undefined){      
      return this.http.post<any>(this.url1, voluntarioBody, this.httpOptions);
    }
    return this.http.put<any>(this.url1, voluntarioBody, this.httpOptions);
  }

  retrieve(id:number): Observable<Auth> {
    return this.http.get<Auth>(this.url1 + "/" + id, this.httpOptions)
      .pipe(
        retry(1)
      );
  }

  delete(v: Auth) : Observable<any> {
    return this.http.delete<any>(this.url1 + '/' + v.idusuario, 
      this.httpOptions);
  }

  list(): Observable<Auth[]> {
    return this.http.get<Auth[]>(this.url1, this.httpOptions)
      .pipe(
        retry(1)
      );
  }



}

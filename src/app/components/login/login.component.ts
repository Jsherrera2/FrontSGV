import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }

  login(usuario:string, contrasena:string) {
    this.authService.login(usuario, contrasena).subscribe(result=> {            
      console.log(result);
        Swal.fire({
          title : "Bienvenid@",
          text : "Ingreso satisfactorio de " + usuario,
          icon : 'success'
        });
        this.router.navigate(['/inicio']);   
           
    });    
  }

}

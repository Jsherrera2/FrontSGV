import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Voluntario} from 'src/app/models/voluntario';
import { VoluntarioService} from 'src/app/services/voluntario.service';
import {Auth} from 'src/app/models/auth';
import {AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-voluntario-form',
  templateUrl: './voluntario-form.component.html',
  styleUrls: ['./voluntario-form.component.css']
})
export class VoluntarioFormComponent implements OnInit {

  title = "Formulario de Aplicación";


  voluntario: Voluntario = new Voluntario();
  auth:Auth = new Auth();
  form: FormGroup;  

  constructor(private voluntarioService: VoluntarioService, 
    private authService: AuthService,
    private formBuilder: FormBuilder, 
    private activatedRoute : ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: [''],
      cedula:[''],    
      telefono: [''],      
      fecha_nacimiento: [''],      
      direccion: [''],      
      sexo: [''],
      nombre:[''],
      contrasena:[''],
    });  

    this.activatedRoute.params.subscribe(
      params => {
        if(params['id']){
          this.voluntarioService.retrieve(params['id']).subscribe(
              result =>
              { 
                this.voluntario = result;
                this.title = "Actualizando el Registro de " + this.voluntario.apellidos+" "+this.voluntario.nombres;
              }
          )
        }
      }
    );
  }



  onSubmit() : void {
    if(this.form.invalid){
      console.error('Error en formulario');
      return;
    }
    console.log(this.voluntario);

    this.voluntarioService.save(this.voluntario).subscribe(
      result => {
        console.log(result);   
        this.router.navigate(['/listV']);

      }
    );

    this.authService.save(this.auth).subscribe(
      result => {
        console.log(result);   
        this.router.navigate(['/listV']);
      }
    );
  }

  onReset() : void {   
    this.form.reset();    
  }


}

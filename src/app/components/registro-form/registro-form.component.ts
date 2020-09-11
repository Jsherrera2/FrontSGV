import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Registro} from 'src/app/models/registro';
import { Aporte } from 'src/app/models/aporte';
import { Evento } from 'src/app/models/evento';
import { Voluntario } from 'src/app/models/voluntario';
import { RegistroService} from 'src/app/services/registro.service';
import { AporteService } from 'src/app/services/aporte.service';
import {EventoService } from 'src/app/services/evento.service';
import {VoluntarioService } from 'src/app/services/voluntario.service';
import { faCalendarDay, faBarcode,faMoneyCheckAlt, faBuilding, faClipboard, faFileSignature, faListOl,faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registro-form',
  templateUrl: './registro-form.component.html',
  styleUrls: ['./registro-form.component.css']
})
export class RegistroFormComponent implements OnInit {

  faCalendarDay=faCalendarDay;
  faBarcode=faBarcode;
  faMoneyCheckAlt=faMoneyCheckAlt;
  faBuilding = faBuilding;
  faClipboard = faClipboard;
  faFileSignature=faFileSignature;
  faListOl = faListOl;
  faArrowAltCircleLeft=faArrowAltCircleLeft;
  submitted: boolean = false;


  title = "Formulario Registro";
  registro: Registro = new Registro();
  voluntarios: Voluntario[];
  eventos: Evento[];
  aportes: Aporte[];


  form: FormGroup;
  constructor(
    private registroService: RegistroService,
    private voluntarioService:VoluntarioService,
    private eventoService: EventoService,
    private aporteService: AporteService, 
    private formBuilder: FormBuilder, 
    private activatedRoute : ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.listAporte();
    this.listEvento();
    this.listVoluntario();
    this.form = this.formBuilder.group({
      idvoluntario: [''],      
      idevento: [''],      
      idaporte: [''],      
    });

    this.activatedRoute.params.subscribe(
      params => {
        if(params['id']){
          this.registroService.retrieve(params['id']).subscribe(
              result =>
              { 
                this.registro= result;
                this.title = "Actualizando el Evento de " + this.registro.idregistro;
              }
          )
        }
      }
    );
  }

  onSubmit() : void {
    this.submitted = true;
    if(this.form.invalid){
      console.error('Error en formulario');
      return;
    }

    console.log(this.registro);

    this.registroService.save(this.registro).subscribe(
      result => {
        this.submitted = false;
        console.log(result);   
        this.router.navigate(['/listR']);

      }
    );
  }

  onReset() : void {   
    this.submitted = false;  
    this.form.reset();    
  }

  listAporte() : void {
    this.aporteService.list().subscribe(result => this.aportes = result);
  }

  listEvento() : void {
    this.eventoService.list().subscribe(result => this.eventos = result);
  }

  listVoluntario() : void {
    this.voluntarioService.list().subscribe(result => this.voluntarios = result);
  }


  get f(){
    return this.form.controls;
  }

}

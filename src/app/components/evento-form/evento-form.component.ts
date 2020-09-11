import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { Categoria } from 'src/app/models/categoria'
import { EventoService } from 'src/app/services/evento.service';
import { CategoriaService } from 'src/app/services/categoria.service'


@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css']
})

export class EventoFormComponent implements OnInit {

  title = "Formulario registro de Evento";
  evento: Evento = new Evento();
  categorias: Categoria[];
  form: FormGroup; 

  constructor(private eventoService: EventoService,
    private categoriaService: CategoriaService, 
    private formBuilder: FormBuilder, 
    private activatedRoute : ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.listCategoria();
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      fecha_inicio: ['',[Validators.required]],
      fecha_final: ['',[Validators.required]],      
      organizador: ['',[Validators.required]],      
      idcategoria: ['',[Validators.required]],      
    });

    this.activatedRoute.params.subscribe(
      params => {
        if(params['id']){
          this.eventoService.retrieve(params['id']).subscribe(
              result =>
              { 
                this.evento = result;
                this.title = "Actualizando el Evento de " + this.evento.nombre;
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

    console.log(this.evento);

    this.eventoService.save(this.evento).subscribe(
      result => {
        console.log(result);   
        this.router.navigate(['/listE']);

      }
    );
  }

  onReset() : void {   
    this.form.reset();    
  }

  listCategoria() : void {
    this.categoriaService.list().subscribe(result => this.categorias = result);
  }


}

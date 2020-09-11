import { Component, OnInit } from '@angular/core';
import { faPlus, faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import {Registro} from 'src/app/models/registro';
import {RegistroService} from 'src/app/services/registro.service';


@Component({
  selector: 'app-registro-list',
  templateUrl: './registro-list.component.html',
  styleUrls: ['./registro-list.component.css']
})
export class RegistroListComponent implements OnInit {

  faEye = faEye;
  faPlus = faPlus;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  eventos :  Registro[];

  constructor(private eventoService:RegistroService) { }

  ngOnInit(): void {
    this.list();
  }

  
  list() : void {
    this.eventoService.list().subscribe(result => this.eventos = result);
  }

  delete(a:Registro) :void {
    Swal.fire({
      title: '¿Está seguro de continuar?',
      text: "El registro número " + a.idregistro+ " será eliminado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.eventoService.delete(a).subscribe(
          result => {
            console.log(result);
            this.list();
          }
        )
      }
    })
  }

}

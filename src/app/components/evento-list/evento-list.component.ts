import { Component, OnInit } from '@angular/core';
import { faPlus, faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/services/evento.service';


@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.css']
})
export class EventoListComponent implements OnInit {

  faEye = faEye;
  faPlus = faPlus;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  eventos :  Evento[];

  constructor(private eventoService:EventoService) { }

  ngOnInit(): void {
    this.list();
  }


  list() : void {
    this.eventoService.list().subscribe(result => this.eventos = result);
  }

  delete(a:Evento) :void {
    Swal.fire({
      title: '¿Está seguro de continuar?',
      text: "El evento organizado por " + a.organizador+ " será eliminado.",
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

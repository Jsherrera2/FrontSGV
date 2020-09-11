import { Component, OnInit } from '@angular/core';

import { faPlus, faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import {Voluntario} from 'src/app/models/voluntario';
import {VoluntarioService} from 'src/app/services/voluntario.service';

@Component({
  selector: 'app-voluntario-list',
  templateUrl: './voluntario-list.component.html',
  styleUrls: ['./voluntario-list.component.css']
})
export class VoluntarioListComponent implements OnInit {

  faEye = faEye;
  faPlus = faPlus;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  voluntarios: Voluntario[];

  constructor(private voluntarioService:VoluntarioService) { }

  ngOnInit(): void {
    this.list();
  }


  list() : void {
    this.voluntarioService.list().subscribe(result => this.voluntarios = result);
  }

  delete(a:Voluntario) :void {
    Swal.fire({
      title: '¿Está seguro de continuar?',
      text: "El registro de " + a.apellidos + " será eliminado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.voluntarioService.delete(a).subscribe(
          result => {
            console.log(result);
            this.list();
          }
        )
      }
    })
  }

}

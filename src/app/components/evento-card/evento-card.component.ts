import { Component, OnInit } from '@angular/core';
import {Evento} from 'src/app/models/evento';
import {EventoService} from 'src/app/services/evento.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-evento-card',
  templateUrl: './evento-card.component.html',
  styleUrls: ['./evento-card.component.css']
})
export class EventoCardComponent implements OnInit {

  evento : Evento;

  constructor(private voluntarioService: EventoService, 
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if(params['id']){
          this.voluntarioService.retrieve(params['id']).subscribe(
            result => this.evento = result
          )
        }
      }
    );
  }

  

}

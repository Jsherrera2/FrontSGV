import { Component, OnInit } from '@angular/core';
import { ReportesService} from 'src/app/services/reportes.service';
import {Reporte } from 'src/app/models/reporte';
import { ChartType, Chart } from 'chart.js';
import { MultiDataSet, Label,SingleDataSet} from 'ng2-charts';
import { Data } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-reporte1',
  templateUrl: './reporte1.component.html',
  styleUrls: ['./reporte1.component.css']
})
export class Reporte1Component implements OnInit {

  categoria:Reporte[];
  cantidad:SingleDataSet=[];
  nombres:string[]=[];

  constructor(private reportecategoria:ReportesService) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.reportecategoria.list().subscribe(result=>{
      this.categoria=result;
      this.data();
    });
  }

  data() {
    this.categoria.forEach(element =>{
      this.cantidad.push(element.C_Eventos);
      this.nombres.push(element.nombre);
    })

    var myChart = new Chart("Productos", {
      type: 'doughnut',
      data: {
          labels: this.nombres,
          datasets: [{
              label: '# of Votes',
              data: this.cantidad,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
    });
  }




}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VoluntariadoComponent } from './components/voluntariado/voluntariado.component';
import { VoluntarioFormComponent } from './components/voluntario-form/voluntario-form.component';
import { VoluntarioListComponent } from './components/voluntario-list/voluntario-list.component';
import { Reporte1Component } from './reportes/reporte1/reporte1.component';
import { Reporte2Component } from './reportes/reporte2/reporte2.component';
import { EventoFormComponent } from './components/evento-form/evento-form.component';
import { EventoListComponent } from './components/evento-list/evento-list.component';
import { RegistroFormComponent } from './components/registro-form/registro-form.component';
import { RegistroListComponent } from './components/registro-list/registro-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { VoluntarioCardComponent } from './components/voluntario-card/voluntario-card.component';
import { EventoCardComponent } from './components/evento-card/evento-card.component';


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'inicio', component: HomeComponent},
  {path: 'involucrate', component: VoluntariadoComponent},
  {path: 'formV', component: VoluntarioFormComponent},
  {path: 'formV/:id', component: VoluntarioFormComponent},
  {path: 'listV', component: VoluntarioListComponent},
  {path: 'voluntario/:id', component: VoluntarioCardComponent},
  


  {path: 'formE', component: EventoFormComponent, canActivate : [AuthGuard], data:{permittedRoles:["usuario","administrador"]}},
  {path: 'formE/:id', component: EventoFormComponent},
  {path: 'listE', component: EventoListComponent},
  {path: 'evento/:id', component: EventoCardComponent},
  


  {path: 'formR', component: RegistroFormComponent, canActivate : [AuthGuard], data:{permittedRoles:["administrador"]}},
  {path: 'formR/:id', component:  RegistroFormComponent},
  {path: 'listR', component: RegistroListComponent},


 //administrador

  {path: 'reporte1', component: Reporte1Component,canActivate : [AuthGuard], data:{permittedRoles:["administrador"]}},
  {path: 'reporte2', component: Reporte2Component},


  {path: 'login', component: LoginComponent},


  

  

 


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

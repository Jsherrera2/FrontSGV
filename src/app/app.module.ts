import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { VoluntariadoComponent } from './components/voluntariado/voluntariado.component';
import { VoluntarioFormComponent } from './components/voluntario-form/voluntario-form.component';
import { VoluntarioListComponent } from './components/voluntario-list/voluntario-list.component';
import { VoluntarioCardComponent } from './components/voluntario-card/voluntario-card.component';
import { VoluntarioService } from './services/voluntario.service';
import { ServiceInterceptor } from './services/service.interceptor';
import { Reporte1Component } from './reportes/reporte1/reporte1.component';
import { Reporte2Component } from './reportes/reporte2/reporte2.component';
import { EventoFormComponent } from './components/evento-form/evento-form.component';
import { EventoListComponent } from './components/evento-list/evento-list.component';
import { EventoCardComponent } from './components/evento-card/evento-card.component';
import { RegistroFormComponent } from './components/registro-form/registro-form.component';
import { RegistroListComponent } from './components/registro-list/registro-list.component';
import { RegistroCardComponent } from './components/registro-card/registro-card.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    VoluntariadoComponent,
    VoluntarioFormComponent,
    VoluntarioListComponent,
    VoluntarioCardComponent,
    Reporte1Component,
    Reporte2Component,
    EventoFormComponent,
    EventoListComponent,
    EventoCardComponent,
    RegistroFormComponent,
    RegistroListComponent,
    RegistroCardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ChartsModule 
  ],
  providers: [
    VoluntarioService, {
      provide: HTTP_INTERCEPTORS,
      useClass: ServiceInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

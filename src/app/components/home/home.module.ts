import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from 'src/app/modules/material.module';
import { PersonasModule } from '../personas/personas.module';
import { InicioComponent } from './inicio/inicio.component';



@NgModule({
  declarations: [
    HomeComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PersonasModule,
    MaterialModule
  ]
})
export class HomeModule { }

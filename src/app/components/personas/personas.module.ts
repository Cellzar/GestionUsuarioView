import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasComponent } from './personas.component';
import { PersonasRoutingModule } from './personas-routing.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/modules/material.module';
import { CrearPersonaModalComponent } from './crear-persona-modal/crear-persona-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaPersonasComponent } from './tabla-personas/tabla-personas.component';
import { EditarPersonaModalComponent } from './editar-persona-modal/editar-persona-modal.component';



@NgModule({
  declarations: [
    PersonasComponent,
    CrearPersonaModalComponent,
    TablaPersonasComponent,
    EditarPersonaModalComponent
  ],
  imports: [
    CommonModule,
    PersonasRoutingModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    PersonasComponent
  ]
})
export class PersonasModule { }

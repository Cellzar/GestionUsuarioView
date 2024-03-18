import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { UsuarioRoutingModule } from './usuarios-routing.module';
import { MaterialModule } from 'src/app/modules/material.module';
import { TablaUsuariosComponent } from './tabla-usuarios/tabla-usuarios.component';
import { CrearUsuarioComponent } from './crear-usuario-modal/crear-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarUsuarioModalComponent } from './editar-usuario-modal/editar-usuario-modal.component';



@NgModule({
  declarations: [
    UsuariosComponent,
    TablaUsuariosComponent,
    CrearUsuarioComponent,
    EditarUsuarioModalComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UsuariosModule { }

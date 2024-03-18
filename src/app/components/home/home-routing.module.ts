import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { InicioComponent } from './inicio/inicio.component';
import { SecurityGuard } from 'src/app/security/security.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gestion',
    pathMatch: 'full'
  },
  {
    path: 'gestion',
    component: HomeComponent,
    canActivate: [SecurityGuard],
    children: [
      { path: '', component: InicioComponent },
      { path: 'personas', loadChildren: () => import('../personas/personas.module').then(m => m.PersonasModule) },
      { path: 'usuarios', loadChildren: () => import('../usuarios/usuarios.module').then(m => m.UsuariosModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }




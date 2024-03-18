import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { CrearUsuarioComponent } from './crear-usuario-modal/crear-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public listUsuarios: Usuario[] = [];

  constructor(public dialog: MatDialog, public usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  openCrearPersonaModal(): void{
    const dialogRef = this.dialog.open(CrearUsuarioComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe((res)=>{
      this.usuarioService.asignarUsuarios(res.datos)
    })
  }
}

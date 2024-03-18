import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { EditarUsuarioModalComponent } from '../editar-usuario-modal/editar-usuario-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  usuarioUpdateSubscription: Subscription | undefined;
  expandedElement: Usuario | null = null;
  displayedColumns: string[] = ['identificador', 'usuarioNombre', 'fechaCreacion', 'acciones'];
  dataSource = new MatTableDataSource<Usuario>();

  constructor(private usuarioService: UsuarioService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.subscribeToPersonaUpdates();
  }

  ngOnDestroy(): void {
    this.unsubscribeFromPersonaUpdates();
  }

  subscribeToPersonaUpdates(): void {
    this.usuarioUpdateSubscription = this.usuarioService.usuarios$.subscribe((usuarios: Usuario[]) => {
      this.dataSource.data = usuarios;
    });
  }

  unsubscribeFromPersonaUpdates(): void {
    if (this.usuarioUpdateSubscription) {
      this.usuarioUpdateSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editUsuario(usuario: Usuario): void {
    const dialogRef = this.dialog.open(EditarUsuarioModalComponent, {
      data: { usuario: usuario},
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  confirmarBorrado(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUsuario(id);
      }
    });
  }

  deleteUsuario(id: number): void {
    this.usuarioService.deleteUsuario(id).subscribe((rest) => {
      if(rest.ok){
        Swal.fire('Exito', rest.mensaje, 'success');
      }

      this.usuarioService.getUsuarios().subscribe((res) => {
        this.usuarioService.asignarUsuarios(res.datos);
      });
    });
  }
}

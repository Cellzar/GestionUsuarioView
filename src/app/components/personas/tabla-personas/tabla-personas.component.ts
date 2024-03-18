import { Component, Input, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Persona } from 'src/app/models/Persona';
import { Subscription } from 'rxjs';
import { PersonaService } from 'src/app/services/persona/persona.service';
import { MatPaginator } from '@angular/material/paginator';
import { EditarPersonaModalComponent } from '../editar-persona-modal/editar-persona-modal.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-tabla-personas',
  templateUrl: './tabla-personas.component.html',
  styleUrls: ['./tabla-personas.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TablaPersonasComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() tipoIdentificacion: [] = [];
  personaUpdateSubscription: Subscription | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Persona>();
  displayedColumns: string[] = ['identificador', 'nombres', 'apellidos', 'numeroIdentificacion', 'email', 'tipoIdentificacion', 'fechaCreacion', 'numeroIdentificacionConcatenado', 'nombresApellidosConcatenados', 'acciones'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: Persona | null = null;
  expandedRows: any[] = [];

  constructor(private personaService: PersonaService, public dialog: MatDialog) {}


  isExpanded(row: Persona): boolean {
    return this.expandedElement === row;
  }

  toggleExpandedRow(element: any): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  ngOnInit(): void {
    this.subscribeToPersonaUpdates();
  }

  ngOnDestroy(): void {
    this.unsubscribeFromPersonaUpdates();
  }

  subscribeToPersonaUpdates(): void {
    this.personaUpdateSubscription = this.personaService.personas$.subscribe((personas: Persona[]) => {
      this.dataSource.data = personas;
    });
  }

  unsubscribeFromPersonaUpdates(): void {
    if (this.personaUpdateSubscription) {
      this.personaUpdateSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editPersona(persona: Persona): void {
    const dialogRef = this.dialog.open(EditarPersonaModalComponent, {
      data: { persona: persona, tipoIdentificacion: this.tipoIdentificacion },
    });

    dialogRef.afterClosed().subscribe(() => {
    });
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
        this.deletePersona(id);
      }
    });
  }

  deletePersona(id: number): void {
    this.personaService.deletePersona(id).subscribe((rest) => {
      if(rest.ok){
        Swal.fire('Exito', rest.mensaje, 'success');
      }

      this.personaService.getPersonas().subscribe((res) => {
        this.personaService.asignarPersonas(res.datos);
      });
    });
  }

  toggleRow(row: any) {
    const index = this.expandedRows.indexOf(row);
    if (index > -1) {
      this.expandedRows.splice(index, 1);
    } else {
      this.expandedRows.push(row);
    }
  }

  isRowExpanded(row: any): boolean {
    return this.expandedRows && this.expandedRows.includes(row);
  }
}




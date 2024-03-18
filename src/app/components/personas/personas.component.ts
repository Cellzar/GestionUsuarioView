import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearPersonaModalComponent } from './crear-persona-modal/crear-persona-modal.component';
import { PersonaService } from 'src/app/services/persona/persona.service';
import { Persona } from 'src/app/models/Persona';


@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent {

  public listTipoDocumento: [] = [];
  public listPersonas: Persona[] = [];
  constructor(public dialog: MatDialog, public personaService: PersonaService) {}

  openCrearPersonaModal(): void{
    const dialogRef = this.dialog.open(CrearPersonaModalComponent, {
      data: { listTipoDocumento: this.listTipoDocumento}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listTipoDocumento = result.listTipoDocumento;
      }
    });
  }

  ngOnInit(): void {
    this.getDatos();
    this.getUsuarios();
  }

  getDatos(){
    this.personaService.getTipoDocumento().subscribe((res)=>{
      this.listTipoDocumento = res.datos;
    })
  }

  getUsuarios(){
    this.personaService.getPersonas().subscribe((res)=>{
      this.personaService.asignarPersonas(res.datos)
    })
  }
}

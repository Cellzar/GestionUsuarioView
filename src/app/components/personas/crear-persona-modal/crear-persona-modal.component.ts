import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonaDto } from 'src/app/models/PersonaDto';
import { PersonaService } from 'src/app/services/persona/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-persona-modal',
  templateUrl: './crear-persona-modal.component.html',
  styleUrls: ['./crear-persona-modal.component.css']
})
export class CrearPersonaModalComponent {

  personaForm: FormGroup = new  FormGroup({});

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public listTipoDocumento: any, private personaService: PersonaService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  guardarPersona(): void {
    if (this.personaForm.valid) {
      const nuevaPersona = new PersonaDto();
      nuevaPersona.apellidos =  this.personaForm.value.apellido;
      nuevaPersona.nombres =  this.personaForm.value.nombre;
      nuevaPersona.tipoIdentificacion =  this.personaForm.value.tipoIdentificacion;
      nuevaPersona.numeroIdentificacion =  this.personaForm.value.identificacion;
      nuevaPersona.email =  this.personaForm.value.email;

      this.personaService.createPersona(nuevaPersona).subscribe((rest) => {
        if(rest.mensaje == 'Persona creado correctamente'){
          Swal.fire('Exito', rest.mensaje, 'success');
        }else{
          Swal.fire('Advertencia', rest.mensaje, 'warning');
        }

        this.personaService.getPersonas().subscribe((res) => {
          this.personaService.asignarPersonas(res.datos);
        });
      });
    } else {
      Swal.fire('Advertencia', 'Completa los campos', 'warning');
    }
  }
}

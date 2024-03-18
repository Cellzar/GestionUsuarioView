import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonaDto } from 'src/app/models/PersonaDto';
import { PersonaService } from 'src/app/services/persona/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-persona-modal',
  templateUrl: './editar-persona-modal.component.html',
  styleUrls: ['./editar-persona-modal.component.css']
})
export class EditarPersonaModalComponent {

  personaForm: FormGroup = new  FormGroup({});

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public datosUsuario: any, private personaService: PersonaService) {

  }

  ngOnInit(): void {
    this.createForm();
    this.llenarCampo();
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

  llenarCampo(){
    this.personaForm.get('nombre')?.setValue(this.datosUsuario?.persona.nombres);
    this.personaForm.get('apellido')?.setValue(this.datosUsuario?.persona.apellidos);
    this.personaForm.get('tipoIdentificacion')?.setValue(this.datosUsuario?.persona.tipoIdentificacion);
    this.personaForm.get('identificacion')?.setValue(this.datosUsuario?.persona.numeroIdentificacion);
    this.personaForm.get('email')?.setValue(this.datosUsuario?.persona.email);
  }

  editar(){
    if (this.personaForm.valid) {
      const editarPersona = new PersonaDto();
      editarPersona.apellidos =  this.personaForm.value.apellido;
      editarPersona.nombres =  this.personaForm.value.nombre;
      editarPersona.tipoIdentificacion =  this.personaForm.value.tipoIdentificacion;
      editarPersona.numeroIdentificacion =  this.personaForm.value.identificacion;
      editarPersona.email =  this.personaForm.value.email;

      this.personaService.updatePersona(this.datosUsuario.persona.identificador,editarPersona).subscribe((rest) => {
        if(rest.ok){
          Swal.fire('Exito', rest.mensaje, 'success');
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

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario-modal.component.html',
  styleUrls: ['./crear-usuario-modal.component.css']
})
export class CrearUsuarioComponent {

  usuarioForm: FormGroup = new  FormGroup({});
  hide = true;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public listTipoDocumento: any, private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.usuarioForm = this.fb.group({
      usuarioNombre: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  guardarUsuario(): void {
    if (this.usuarioForm.valid) {

      const usuarioNuevo = this.usuarioForm.value;

      this.usuarioService.createUsuario(usuarioNuevo).subscribe((rest) => {
        if(rest.ok){
          Swal.fire('Exito', rest.mensaje, 'success');
        }

        this.usuarioService.getUsuarios().subscribe((res) => {
          this.usuarioService.asignarUsuarios(res.datos);
        });
      });
    } else {
      Swal.fire('Advertencia', 'Completa los campos', 'warning');
    }
  }
}

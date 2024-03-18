import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario-modal',
  templateUrl: './editar-usuario-modal.component.html',
  styleUrls: ['./editar-usuario-modal.component.css']
})
export class EditarUsuarioModalComponent {

  usuarioForm: FormGroup = new  FormGroup({});
  hide = true;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public datosUsuario: any, private usuarioService: UsuarioService) {
  console.log("🚀 ~ EditarUsuarioModalComponent ~ constructor ~ datosUsuario:", datosUsuario)
  }

  ngOnInit(): void {
    this.createForm();
    this.llenarCampo();
  }

  createForm(){
    this.usuarioForm = this.fb.group({
      usuarioNombre: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  llenarCampo(){
    this.usuarioForm.get('usuarioNombre')?.setValue(this.datosUsuario?.usuario.usuarioNombre);
    const decodedString = atob(this.datosUsuario?.usuario.pass)
    this.usuarioForm.get('pass')?.setValue(decodedString);
  }

  editar(){
    if (this.usuarioForm.valid) {
      console.log("🚀 ~ EditarUsuarioModalComponent ~ editar ~ this.usuarioForm:", this.usuarioForm.value)

      const editarUsuario = this.usuarioForm.value;

      this.usuarioService.updateUsuario(this.datosUsuario.usuario.identificador,editarUsuario).subscribe((rest) => {
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

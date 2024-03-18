import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioDto } from 'src/app/models/UsuarioDto';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({});
  hide = true;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != "" || localStorage.getItem('token') != undefined){
      this.router.navigate(["gestion"]);
    }
    this.createForm();

  }

  createForm(){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      const usuario = new UsuarioDto();
      usuario.usuarioNombre = username;
      usuario.pass = password;
      this.authService.login(usuario).subscribe((result) => {
        if (result) {


          if(result.token == null){
            Swal.fire('Error', result.mensaje, 'warning');
          }else{
            localStorage.setItem('token', result.token);
            Swal.fire('Exito', result.mensaje, 'success');
            this.router.navigate(['/gestion']);
          }

        } else {
          Swal.fire('Advertencia', 'Credenciales incorrectas', 'warning');
        }
      }, error =>{
        Swal.fire('Error', 'Ocurrio un error, intenta mas tarde', 'error')
      }
      );
    }
  }
}

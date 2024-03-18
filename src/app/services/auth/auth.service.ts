import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatosUsuarioDto } from 'src/app/models/DatosUsuarioDto';
import { UsuarioDto } from 'src/app/models/UsuarioDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url: string = environment.urlApi;

  constructor(public http: HttpClient) { }

  login(usuario: UsuarioDto){
    return this.http.post<DatosUsuarioDto>(`${this.url}/Usuario/login`, usuario);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RespuestaDto } from 'src/app/models/RespuestaDto';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioDto } from 'src/app/models/UsuarioDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url: string = environment.urlApi;
  private usuarioSource = new BehaviorSubject<Usuario[]>([]);
  usuarios$ = this.usuarioSource.asObservable();
  constructor(public http: HttpClient) { }

  getUsuarios(){
    return this.http.get<RespuestaDto>(`${this.url}/Usuario`);
  }

  createUsuario(usuarioDto: UsuarioDto) {
    return this.http.post<RespuestaDto>(`${this.url}/Usuario/registrar`, usuarioDto);
  }

  updateUsuario(id: number, usuarioDto: UsuarioDto){
    return this.http.put<RespuestaDto>(`${this.url}/Usuario/${id}`, usuarioDto);
  }

  deleteUsuario(id: number){
    return this.http.delete<RespuestaDto>(`${this.url}/Usuario/${id}`);
  }

  asignarUsuarios(usuarios: Usuario[]): void {
    this.usuarioSource.next(usuarios);
  }


}

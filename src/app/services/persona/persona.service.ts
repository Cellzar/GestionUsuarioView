import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Persona } from 'src/app/models/Persona';
import { PersonaDto } from 'src/app/models/PersonaDto';
import { RespuestaDto } from 'src/app/models/RespuestaDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  public url: string = environment.urlApi;
  private personaSource = new BehaviorSubject<Persona[]>([]);
  personas$ = this.personaSource.asObservable();

  constructor(public http: HttpClient) { }


  getTipoDocumento(){
    return this.http.get<RespuestaDto>(`${this.url}/tipodocumento`);
  }

  getPersonas(){
    return this.http.get<RespuestaDto>(`${this.url}/Personas`);
  }

  createPersona(personaDto: PersonaDto) {
    return this.http.post<RespuestaDto>(`${this.url}/Personas`, personaDto);
  }

  updatePersona(id: number, persona: PersonaDto){
    return this.http.put<RespuestaDto>(`${this.url}/Personas/${id}`, persona);
  }

  deletePersona(id: number){
    return this.http.delete<RespuestaDto>(`${this.url}/Personas/${id}`);
  }

  asignarPersonas(personas: Persona[]): void {
    this.personaSource.next(personas);
  }
}

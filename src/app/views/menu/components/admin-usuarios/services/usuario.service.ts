import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioAPI } from 'src/app/core/routes-api/usuario_api';
import { HttpService } from 'src/app/core/services/http.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http$: HttpService) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http$.get(UsuarioAPI.AdminTodos);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http$.get(`${UsuarioAPI.Base}/${id}`);
  }

  suspenderUsuario(id: number): Observable<any> {
    return this.http$.put(`${UsuarioAPI.Base}/${id}/suspender`, {});
  }

  activarUsuario(id: number): Observable<any> {
    return this.http$.put(`${UsuarioAPI.Base}/${id}/activar`, {});
  }
}

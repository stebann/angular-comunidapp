import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioAPI } from 'src/app/core/routes-api/usuario_api';
import { HttpService } from 'src/app/core/services/http.service';
import { ProfileRepository } from '../repositories/profile-repository';

@Injectable({ providedIn: 'root' })
export class ProfileService extends ProfileRepository {
  public formUsuario = this.form();

  constructor(private http$: HttpService) {
    super();
  }

  update(): Observable<any> {
    return this.http$.put(UsuarioAPI.Base, this.formUsuario.value);
  }

  usuarioById(id: number): any {
    this.http$.get(`${UsuarioAPI.Base}/${id}`).subscribe((usuario) => {
      this.formUsuario.patchValue(usuario);
    });
  }
}

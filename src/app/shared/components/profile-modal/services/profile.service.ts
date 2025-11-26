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

  update(id: number): Observable<any> {
    const url = `${UsuarioAPI.PorId}${id}`;

    const formData = new FormData();
    const formValues = this.formUsuario.value;

    // Agregar solo los campos necesarios (sin avatarUrl)
    Object.keys(formValues).forEach((key) => {
      if (key !== 'avatarUrl') {
        const value = formValues[key];
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      }
    });

    return this.http$.putFormData(url, formData);
  }

  usuarioById(id: number): any {
    this.http$.get(`${UsuarioAPI.PorId}${id}`).subscribe((usuario) => {
      this.formUsuario.patchValue(usuario);
    });
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComerciosAPI } from 'src/app/core/routes-api/comercios_api';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { Comercio } from '../../models/comercio.model';
import { MisNegociosRepository } from '../repositories/mis-negocios-repository';

@Injectable({ providedIn: 'root' })
export class MisNegociosService extends MisNegociosRepository {
  public comercios: Comercio[] = [];
  public formComercio = this.form();

  constructor(private http$: HttpService, private authService: AuthService) {
    super();
  }

  getComerciosPorUsuario(): void {
    const usuarioId = this.authService.currentState.id;
    if (usuarioId) {
      this.http$
        .get(`${ComerciosAPI.PorUsuario}${usuarioId}`)
        .subscribe((response: any) => {
          this.comercios = response || [];
        });
    }
  }

  crearComercio(imagenes: File[], usuarioId: number): Observable<any> {
    const url = `${ComerciosAPI.Crear}?usuarioId=${usuarioId}`;

    const formData = new FormData();
    const formValues = this.formComercio.value;

    Object.keys(formValues).forEach((key) => {
      if (key !== 'imagenes' && formValues[key] != null) {
        formData.append(key, formValues[key]);
      }
    });

    imagenes.forEach((file) => {
      formData.append('imagenes', file, file.name);
    });

    return this.http$.postFormData(url, formData);
  }
}

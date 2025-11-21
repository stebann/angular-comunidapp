import { Injectable } from '@angular/core';
import { ComerciosAPI } from 'src/app/core/routes-api/comercios_api';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { Comercio } from '../../models/comercio.model';

@Injectable({ providedIn: 'root' })
export class MisNegociosService {
  public comercios: Comercio[] = [];

  constructor(private http$: HttpService, private authService: AuthService) {}

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
}

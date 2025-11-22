import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PremiumAPI } from 'src/app/core/routes-api/premium_api';
import { HttpService } from 'src/app/core/services/http.service';
import { AdminGestionPremiumRepository } from '../repositories/admin-gestion-premium-repository';

@Injectable({ providedIn: 'root' })
export class AdminGestionPremiumService extends AdminGestionPremiumRepository {
  public filtroForm = this.filtro();
  constructor(private http$: HttpService) {
    super();
  }

  obtenerSolicitudesPremium(): Observable<any> {
    return this.http$.get(PremiumAPI.Solicitudes);
  }

  getSolicitudesPorUsuario(usuarioId: number): Observable<any> {
    return this.http$.get(`${PremiumAPI.SolicitudesPorUsuario}${usuarioId}`);
  }

  cambiarEstadoSolicitud(
    id: number,
    adminId: number,
    estado: number
  ): Observable<any> {
    return this.http$.post(
      `${PremiumAPI.CambiarEstadoSolicitud}${id}?adminId=${adminId}&estado=${estado}`,
      {}
    );
  }
}

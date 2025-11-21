import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PremiumAPI } from 'src/app/core/routes-api/premium_api';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({ providedIn: 'root' })
export class AdminGestionPremiumService {
  constructor(private http$: HttpService) {}

  getSolicitudesPendientes(): Observable<any> {
    return this.http$.get(PremiumAPI.SolicitudesPendientes);
  }

  getSolicitudesPorUsuario(usuarioId: number): Observable<any> {
    return this.http$.get(`${PremiumAPI.SolicitudesPorUsuario}${usuarioId}`);
  }

  cambiarEstadoSolicitud(id: number, data: any): Observable<any> {
    return this.http$.post(`${PremiumAPI.CambiarEstadoSolicitud}${id}`, data);
  }
}

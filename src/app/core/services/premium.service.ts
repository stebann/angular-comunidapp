import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PremiumAPI } from '../routes-api/premium_api';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class PremiumService {
  constructor(private http$: HttpService) {}

  solicitarPremium(usuarioId: number): Observable<any> {
    const url = `${PremiumAPI.Solicitar}?usuarioId=${usuarioId}`;
    return this.http$.post(url, {});
  }

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

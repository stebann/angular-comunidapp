import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComerciosAPI } from 'src/app/core/routes-api/comercios_api';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({ providedIn: 'root' })
export class MisNegociosService {
  constructor(private http$: HttpService) {}

  getComerciosPorUsuario(usuarioId: number): Observable<any> {
    return this.http$.get(`${ComerciosAPI.PorUsuario}${usuarioId}`);
  }

  getSolicitudesPendientes(): Observable<any> {
    return this.http$.get(ComerciosAPI.SolicitudesPendientes);
  }

  crearSolicitud(data: any): Observable<any> {
    return this.http$.post(ComerciosAPI.Solicitud, data);
  }

  getSolicitudPorId(id: number): Observable<any> {
    return this.http$.get(`${ComerciosAPI.SolicitudPorId}${id}`);
  }

  cambiarEstadoSolicitud(id: number, data: any): Observable<any> {
    return this.http$.post(`${ComerciosAPI.CambiarEstadoSolicitud}${id}`, data);
  }
}

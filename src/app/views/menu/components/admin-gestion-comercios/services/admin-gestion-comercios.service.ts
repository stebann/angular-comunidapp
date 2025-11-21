import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComerciosAPI } from 'src/app/core/routes-api/comercios_api';
import { HttpService } from 'src/app/core/services/http.service';
import { Comercio } from '../../comercios/models/comercio.model';

@Injectable({ providedIn: 'root' })
export class AdminGestionComerciosService {
  public comercios: Comercio[] = [];

  constructor(private http$: HttpService) {}

  getSolicitudPorId(id: number): Observable<any> {
    return this.http$.get(`${ComerciosAPI.SolicitudPorId}${id}`);
  }

  getSolicitudesPendientes(): Observable<any> {
    return this.http$.get(ComerciosAPI.SolicitudesPendientes);
  }

  cambiarEstadoSolicitud(id: number, data: any): Observable<any> {
    return this.http$.post(`${ComerciosAPI.CambiarEstadoSolicitud}${id}`, data);
  }
}

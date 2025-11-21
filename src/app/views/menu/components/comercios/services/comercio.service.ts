import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComerciosAPI } from 'src/app/core/routes-api/comercios_api';
import { FiltrosAPI } from 'src/app/core/routes-api/filtros_api';
import { HttpService } from 'src/app/core/services/http.service';
import { Comercio } from '../models/comercio.model';
import { ComercioRepository } from '../repositories/comercio-repository';

@Injectable({ providedIn: 'root' })
export class ComercioService extends ComercioRepository {
  public comercios: Comercio[] = [];
  public filtroComercio = this.filtro();
  public filtroComercioDetalle = this.filtroDetalle();

  constructor(private http$: HttpService) {
    super();
  }

  getComercios(): Observable<any> {
    return this.http$.get(ComerciosAPI.Base);
  }

  getComercioPorId(id: number): Observable<any> {
    return this.http$.get(`${ComerciosAPI.PorId}${id}`);
  }

  crearComercio(data: any): Observable<any> {
    return this.http$.post(ComerciosAPI.Crear, data);
  }

  crearSolicitud(data: any): Observable<any> {
    return this.http$.post(ComerciosAPI.Solicitud, data);
  }

  getSolicitudPorId(id: number): Observable<any> {
    return this.http$.get(`${ComerciosAPI.SolicitudPorId}${id}`);
  }

  getSolicitudesPendientes(): Observable<any> {
    return this.http$.get(ComerciosAPI.SolicitudesPendientes);
  }

  cambiarEstadoSolicitud(id: number, data: any): Observable<any> {
    return this.http$.post(`${ComerciosAPI.CambiarEstadoSolicitud}${id}`, data);
  }

  public filtrar(): void {
    this.http$
      .post(FiltrosAPI.Buscar, this.filtroComercio.value)
      .subscribe((response: any) => {
        this.comercios = response.data || [];
      });
  }

  public filtrarDetalle(): void {
    this.http$
      .post(ComerciosAPI.PorId, this.filtroComercioDetalle.value)
      .subscribe((response: any) => {
        this.comercios = response.data || [];
      });
  }
}

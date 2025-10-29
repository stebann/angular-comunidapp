import { Injectable } from '@angular/core';
import { FiltrosAPI } from 'src/app/core/routes-api/filtros_api';
import { PrestamosAPI } from 'src/app/core/routes-api/prestamos_api';
import { SolicitudesAPI } from 'src/app/core/routes-api/solicitudes_api';
import { HttpService } from 'src/app/core/services/http.service';
import { Gestiones } from '../models/gestiones.model';
import { MisGestionesRepository } from '../repositories/mis-gestiones-repository';

@Injectable({ providedIn: 'root' })
export class MisGestionesService extends MisGestionesRepository {
  public gestiones: Gestiones[] = [];
  public solicitudesRecibidas: Gestiones[] = [];
  public solicitudesEnviadas: Gestiones[] = [];
  public prestamosRecibidos: Gestiones[] = [];
  public prestamosOtorgados: Gestiones[] = [];
  public filtroGestiones = this.filtro();

  constructor(private http$: HttpService) {
    super();
  }

  getSolicitudesUsuario(usuarioId: number): void {
    this.http$
      .get(`${SolicitudesAPI.PorUsuario}${usuarioId}`)
      .subscribe((response: any) => {
        this.gestiones = response.data || [];
      });
  }

  getPrestamosUsuario(usuarioId: number): void {
    this.http$
      .get(`${PrestamosAPI.PorUsuario}${usuarioId}`)
      .subscribe((response: any) => {
        this.gestiones = response.data || [];
      });
  }

  public filtrar(): void {
    this.http$
      .post(FiltrosAPI.Buscar, this.filtroGestiones.value)
      .subscribe((response: any) => {
        this.gestiones = response.data || [];
      });
  }
}

import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { EstadisticasAPI } from 'src/app/core/routes-api/estadisticas_api';
import { Observable } from 'rxjs';
import { EstadisticasRepository } from '../repositories/comercio-repository';
import { EstadisticasUsuario, ResumenEstadisticas, RESUMEN_ESTADISTICAS_DEFAULT } from '../models/estadisticas.model';

@Injectable({ providedIn: 'root' })
export class EstadisticasService extends EstadisticasRepository {
  public filtroEstadisticas = this.filtro();
  public estadisticas: any[] = [];

  constructor(private http$: HttpService) {
    super();
  }

  getEstadisticas(usuarioId: number): Observable<EstadisticasUsuario> {
    return this.http$.get<EstadisticasUsuario>(`${EstadisticasAPI.PorUsuario}${usuarioId}`);
  }

  mapearResumenEstadisticas(data: EstadisticasUsuario): ResumenEstadisticas {
    return {
      misRecursos: { valor: data.misRecursos, titulo: 'Mis Recursos', icon: 'fas fa-box' },
      intercambios: { valor: data.intercambios, titulo: 'Intercambios', icon: 'fas fa-exchange-alt' },
      intercambiosCompletados: { valor: data.intercambiosCompletados, titulo: 'Intercambios Completados', icon: 'fas fa-check-circle' },
      cancelaciones: { valor: data.cancelaciones, titulo: 'Cancelaciones', icon: 'fas fa-times-circle' },
      usuariosContactados: { valor: data.usuariosContactados, titulo: 'Usuarios Contactados', icon: 'fas fa-users' },
      articulosPublicadosMes: { valor: data.articulosPublicadosMes, titulo: 'Artículos este Mes', icon: 'fas fa-calendar-alt' },
      miReputacion: { valor: data.miReputacion, titulo: 'Mi Reputación', icon: 'fas fa-star' },
      tasaAceptacion: { valor: data.tasaAceptacion, titulo: 'Tasa de Aceptación', icon: 'fas fa-percentage' },
    };
  }
}

import { Injectable } from '@angular/core';
import { FiltrosAPI } from 'src/app/core/routes-api/filtros_api';
import { HttpService } from 'src/app/core/services/http.service';
import { EstadisticasRepository } from '../repositories/comercio-repository';

@Injectable({ providedIn: 'root' })
export class EstadisticasService extends EstadisticasRepository {
  public filtroEstadisticas = this.filtro();
  public estadisticas: any[] = [];

  constructor(private http$: HttpService) {
    super();
  }

  filtrar(): void {
    this.http$
      .get(FiltrosAPI.Buscar, this.filtroEstadisticas.value)
      .subscribe((response: any) => {
        this.estadisticas = response.data || [];
      });
  }
}

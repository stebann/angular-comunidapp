import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { EstadisticasRepository } from '../repositories/comercio-repository';

@Injectable({ providedIn: 'root' })
export class EstadisticasService extends EstadisticasRepository {
  public estadisticas: any[] = [];
  public filtroEstadisticas = this.filtro();

  constructor(private http$: HttpService) {
    super();
  }

  public filtrar(): void {
    this.http$
      .post('/filtro/estadisticas', this.filtroEstadisticas.value)
      .subscribe((response: any) => {
        this.estadisticas = response.data;
      });
  }
}

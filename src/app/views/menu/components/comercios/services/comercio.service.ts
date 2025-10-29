import { Injectable } from '@angular/core';
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

  getComercios(): void {
    this.http$.get(ComerciosAPI.Base).subscribe((response: any) => {
      this.comercios = response.data || [];
    });
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

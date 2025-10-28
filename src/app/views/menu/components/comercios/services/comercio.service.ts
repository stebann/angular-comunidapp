import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { ComercioRepository } from '../repositories/comercio-repository';

@Injectable({ providedIn: 'root' })
export class ComercioService extends ComercioRepository {
  public comercios: any[] = [];
  public filtroComercio = this.filtro();
  public filtroComercioDetalle = this.filtroDetalle();

  constructor(private http$: HttpService) {
    super();
  }

  public filtrar(): void {
    this.http$
      .post('/filtro/comercios', this.filtroComercio.value)
      .subscribe((response: any) => {
        this.comercios = response.data;
      });
  }

  public filtrarDetalle(): void {
    this.http$
      .post('/filtro/comercios/detalle', this.filtroComercioDetalle.value)
      .subscribe((response: any) => {
        this.comercios = response.data;
      });
  }
}

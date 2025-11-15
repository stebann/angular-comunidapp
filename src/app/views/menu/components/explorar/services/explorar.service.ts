import { Injectable } from '@angular/core';
import { ArticuloAPI } from 'src/app/core/routes-api/articulo_api';
import { FiltrosAPI } from 'src/app/core/routes-api/filtros_api';
import { HttpService } from 'src/app/core/services/http.service';
import { Articulo } from 'src/app/shared/models/articulo.model';
import { ExplorarRepository } from '../repositories/explorar-repository';

@Injectable({ providedIn: 'root' })
export class ExplorarService extends ExplorarRepository {
  public filtroExplorar = this.filtro();
  public articulos: Articulo[] = [];

  constructor(private http$: HttpService) {
    super();
  }

  filtrar(): void {
    this.http$
      .post(FiltrosAPI.Buscar, this.filtroExplorar.value)
      .subscribe((response: any) => {
        this.articulos = response.data || [];
      });
  }

  getArticulos(): void {
    this.http$.get(ArticuloAPI.Base).subscribe((response: any) => {
      this.articulos = Array.isArray(response) ? response : response.data || [];
    });
  }
}

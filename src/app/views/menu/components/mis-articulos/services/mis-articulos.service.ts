import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticuloAPI } from 'src/app/core/routes-api/articulo_api';
import { FiltrosAPI } from 'src/app/core/routes-api/filtros_api';
import { HttpService } from 'src/app/core/services/http.service';
import { Articulo } from '../models/articulo';
import { MisArticulosRepository } from '../repositories/mis-articulos-repository';

@Injectable({ providedIn: 'root' })
export class MisArticulosService extends MisArticulosRepository {
  public formMisArticulos = this.form();
  public filtroMisArticulos = this.filtro();
  public articulos: Articulo[] = [];

  constructor(private http$: HttpService) {
    super();
  }

  crear(usuarioId: number): Observable<any> {
    const url = `${ArticuloAPI.Crear}?usuarioId=${usuarioId}`;
    return this.http$.post(url, this.formMisArticulos.value);
  }

  filtrar(): void {
    this.http$
      .post(FiltrosAPI.Buscar, this.filtroMisArticulos.value)
      .subscribe((response: any) => {
        this.articulos = response.data || [];
      });
  }

  getMisArticulos(usuarioId: number): void {
    const url = `${ArticuloAPI.PorUsuario}${usuarioId}`;
    this.http$.get(url).subscribe((response: any) => {
      this.articulos = response.data || [];
    });
  }
}

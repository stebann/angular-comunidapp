import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FiltrosAPI } from '../../core/routes-api/filtros_api';
import { HttpService } from '../../core/services/http.service';
import { FilterOption, IFilter } from '../models/filter-models';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  constructor(private http: HttpService) {}

  getCategorias(): Observable<FilterOption[]> {
    return this.http
      .get<IFilter[]>(FiltrosAPI.Categorias)
      .pipe(map((data) => this.mapToFilterOptions(data || [])));
  }

  getCondiciones(): Observable<FilterOption[]> {
    return this.http
      .get<IFilter[]>(FiltrosAPI.Condiciones)
      .pipe(map((data) => this.mapToFilterOptions(data || [])));
  }

  getTiposTransaccion(): Observable<FilterOption[]> {
    return this.http
      .get<IFilter[]>(FiltrosAPI.Tipos)
      .pipe(map((data) => this.mapToFilterOptions(data || [])));
  }

  getRoles(): Observable<FilterOption[]> {
    return this.http
      .get<IFilter[]>(FiltrosAPI.Roles)
      .pipe(map((data) => this.mapToFilterOptions(data || [])));
  }

  getCategoriasComercios(): Observable<FilterOption[]> {
    return this.http
      .get<IFilter[]>(FiltrosAPI.CategoriasComercios)
      .pipe(map((data) => this.mapToFilterOptions(data || [])));
  }

  getCategoriasArticulosComercio(
    comercioId: number
  ): Observable<FilterOption[]> {
    return this.http
      .get<IFilter[]>(
        `${FiltrosAPI.CategoriasArticulosComercio}${comercioId}/categorias-articulos`
      )
      .pipe(map((data) => this.mapToFilterOptions(data || [])));
  }

  private mapToFilterOptions(data: IFilter[]): FilterOption[] {
    return data.map((item) => ({
      value: item.codigo,
      label: item.nombre,
    }));
  }
}

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FiltrosAPI } from '../../core/routes-api/filtros_api';
import { HttpService } from '../../core/services/http.service';
import { FilterOption } from '../models/filter-models';

interface RawFilter {
  id: string | number;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  constructor(private http: HttpService) {}

  getCategorias(): Observable<FilterOption[]> {
    return this.http
      .get<RawFilter[]>(FiltrosAPI.Categorias)
      .pipe(map((data) => this.mapToFilterOptions(data || [])));
  }

  getEstados(): Observable<FilterOption[]> {
    return this.http
      .get<RawFilter[]>(FiltrosAPI.Estados)
      .pipe(map((data) => this.mapToFilterOptions(data || [])));
  }

  getTiposTransaccion(): Observable<FilterOption[]> {
    return this.http
      .get<RawFilter[]>(FiltrosAPI.Tipos)
      .pipe(map((data) => this.mapToFilterOptions(data || [])));
  }

  private mapToFilterOptions(data: RawFilter[]): FilterOption[] {
    return data.map((item) => ({
      value: String(item.id),
      label: item.nombre,
    }));
  }
}

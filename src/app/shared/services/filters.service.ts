import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FiltersAPI } from '../../core/routes-api/filters_api';
import { HttpService } from '../../core/services/http.service';
import { ArticuloFilter } from '../models/filter-models';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  private currentFiltersSubject = new BehaviorSubject<ArticuloFilter>({});

  constructor(private httpService: HttpService) {}

  // Métodos de control del sidebar
  open(): void {
    this.isOpenSubject.next(true);
  }

  close(): void {
    this.isOpenSubject.next(false);
  }

  isOpen$(): Observable<boolean> {
    return this.isOpenSubject.asObservable();
  }

  // Método para filtrar artículos llamando a la API
  filtrarArticulos(filters: ArticuloFilter): Observable<any[]> {
    return this.httpService.post<any[]>(FiltersAPI.FiltrarArticulos, filters);
  }

  getCurrentFilters$(): Observable<ArticuloFilter> {
    return this.currentFiltersSubject.asObservable();
  }

  // Métodos de API para obtener opciones de dropdowns
  getCategorias(): Observable<string[]> {
    return this.httpService.get<string[]>(FiltersAPI.Categorias);
  }

  getEstados(): Observable<string[]> {
    return this.httpService.get<string[]>(FiltersAPI.Estados);
  }

  getTipos(): Observable<string[]> {
    return this.httpService.get<string[]>(FiltersAPI.Tipos);
  }
}

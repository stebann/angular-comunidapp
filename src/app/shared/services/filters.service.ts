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

  // Método para filtrar artículos llamando a la API nueva (GET con query params)
  filtrarArticulos(filters: ArticuloFilter): Observable<any[]> {
    const params = this.buildQueryParams(filters);
    return this.httpService.get<any[]>(FiltersAPI.Buscar, params);
  }

  getCurrentFilters$(): Observable<ArticuloFilter> {
    return this.currentFiltersSubject.asObservable();
  }

  // Métodos de API para obtener opciones de dropdowns
  getCategorias(): Observable<Array<{ id: number; nombre: string }>> {
    return this.httpService.get<Array<{ id: number; nombre: string }>>(
      FiltersAPI.Categorias
    );
  }

  getEstados(): Observable<Array<{ id: string | number; nombre: string }>> {
    return this.httpService.get<Array<{ id: string | number; nombre: string }>>(
      FiltersAPI.Estados
    );
  }

  getTipos(): Observable<Array<{ id: string | number; nombre: string }>> {
    return this.httpService.get<Array<{ id: string | number; nombre: string }>>(
      FiltersAPI.Tipos
    );
  }

  private buildQueryParams(filters: ArticuloFilter) {
    let params = this.httpService.params;
    if (filters.nombreArticulo)
      params = params.set('nombreArticulo', filters.nombreArticulo);
    if (filters.categoriaId)
      params = params.set('categoriaId', String(filters.categoriaId));
    if (filters.tipoTransaccionId)
      params = params.set('tipoTransaccionId', String(filters.tipoTransaccionId));
    if (filters.estadoId)
      params = params.set('estadoId', String(filters.estadoId));
    if (filters.nombreUsuario)
      params = params.set('nombreUsuario', filters.nombreUsuario);
    return params;
  }
}

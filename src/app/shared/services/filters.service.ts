import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ArticuloFilter,
  FilterResult,
  FilterState,
} from '../models/filter-models';
import { FiltersRepository } from '../repositories/filters-repository';

@Injectable({
  providedIn: 'root',
})
export class FiltersService extends FiltersRepository {
  private filterStateSubject = new BehaviorSubject<FilterState>({
    isOpen: false,
    filters: {},
    hasActiveFilters: false,
  });

  constructor() {
    super();
  }

  getFilterState(): Observable<FilterState> {
    return this.filterStateSubject.asObservable();
  }

  setFilterState(state: Partial<FilterState>): void {
    const currentState = this.filterStateSubject.value;
    const newState = { ...currentState, ...state };

    // Actualizar hasActiveFilters basado en si hay filtros activos
    newState.hasActiveFilters = this.hasActiveFilters(newState.filters);

    this.filterStateSubject.next(newState);
  }

  applyFilters<T>(data: T[], filters: ArticuloFilter): FilterResult<T> {
    let filteredData = [...data];

    // Aplicar filtros
    if (filters.categoria && filters.categoria !== 'todos') {
      filteredData = filteredData.filter((item: any) =>
        item.categoria?.toLowerCase().includes(filters.categoria!.toLowerCase())
      );
    }

    if (filters.estado && filters.estado !== 'todos') {
      filteredData = filteredData.filter((item: any) =>
        item.estado?.toLowerCase().includes(filters.estado!.toLowerCase())
      );
    }

    if (filters.nombre) {
      filteredData = filteredData.filter(
        (item: any) =>
          item.titulo?.toLowerCase().includes(filters.nombre!.toLowerCase()) ||
          item.descripcion
            ?.toLowerCase()
            .includes(filters.nombre!.toLowerCase())
      );
    }

    if (filters.tipo && filters.tipo !== 'todos') {
      filteredData = filteredData.filter(
        (item: any) => item.tipo === filters.tipo
      );
    }

    if (filters.fechaCreacionInicio) {
      filteredData = filteredData.filter((item: any) => {
        if (!item.fechaCreacion) return false;
        const itemDate = new Date(item.fechaCreacion);
        return itemDate >= filters.fechaCreacionInicio!;
      });
    }

    if (filters.fechaCreacionFin) {
      filteredData = filteredData.filter((item: any) => {
        if (!item.fechaCreacion) return false;
        const itemDate = new Date(item.fechaCreacion);
        return itemDate <= filters.fechaCreacionFin!;
      });
    }

    return {
      data: filteredData,
      totalCount: filteredData.length,
      appliedFilters: filters,
    };
  }

  clearFilters(): void {
    this.setFilterState({
      filters: {},
      hasActiveFilters: false,
    });
  }

  getFilterOptions(): {
    categorias: string[];
    estados: string[];
    tipos: string[];
  } {
    return {
      categorias: [
        'Tecnología',
        'Libros',
        'Deportes',
        'Música',
        'Hogar',
        'Ropa',
        'Herramientas',
        'Juguetes',
        'Otros',
      ],
      estados: [
        'Disponible',
        'Prestado',
        'Vendido',
        'En reparación',
        'Reservado',
      ],
      tipos: ['prestamo', 'venta', 'todos'],
    };
  }

  private hasActiveFilters(filters: ArticuloFilter): boolean {
    return !!(
      filters.categoria ||
      filters.estado ||
      filters.nombre ||
      filters.tipo ||
      filters.fechaCreacionInicio ||
      filters.fechaCreacionFin
    );
  }
}

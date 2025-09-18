import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ArticuloFilter, FilterState } from '../../models/filter-models';
import { FiltersService } from '../../services/filters.service';
import { DropdownOption } from '../dropdown-field/dropdown-field.component';

@Component({
  selector: 'app-filters-sidebar',
  templateUrl: './filters-sidebar.component.html',
  styleUrls: ['./filters-sidebar.component.scss'],
})
export class FiltersSidebarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  filterState: FilterState = {
    isOpen: false,
    filters: {},
    hasActiveFilters: false,
  };

  currentFilters: ArticuloFilter = {};
  filterOptions = {
    categorias: [] as string[],
    estados: [] as string[],
    tipos: [] as string[],
  };

  // Opciones para los dropdowns
  categoriaOptions: DropdownOption[] = [];
  estadoOptions: DropdownOption[] = [];
  tipoOptions: DropdownOption[] = [];

  constructor(private filtersService: FiltersService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios del estado del filtro
    this.filtersService
      .getFilterState()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.filterState = state;
        this.currentFilters = { ...state.filters };
      });

    // Obtener opciones de filtros
    this.filterOptions = this.filtersService.getFilterOptions();

    // Convertir las opciones al formato del dropdown
    this.categoriaOptions = this.filterOptions.categorias.map((categoria) => ({
      value: categoria,
      label: categoria,
    }));

    this.estadoOptions = this.filterOptions.estados.map((estado) => ({
      value: estado,
      label: estado,
    }));

    this.tipoOptions = this.filterOptions.tipos.map((tipo) => ({
      value: tipo,
      label:
        tipo === 'prestamo' ? 'Préstamo' : tipo === 'venta' ? 'Venta' : 'Todos',
    }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFilterChange(
    filterType: keyof ArticuloFilter,
    value: string | Event
  ): void {
    let actualValue: string;

    if (typeof value === 'string') {
      actualValue = value;
    } else {
      const target = value.target as HTMLInputElement;
      actualValue = target.value;
    }

    this.currentFilters = {
      ...this.currentFilters,
      [filterType]: actualValue === 'todos' ? undefined : actualValue,
    };
  }

  onDateChange(
    dateType: 'fechaCreacionInicio' | 'fechaCreacionFin',
    value: Date | null
  ): void {
    this.currentFilters = {
      ...this.currentFilters,
      [dateType]: value || undefined,
    };
  }

  applyFilters(): void {
    this.filtersService.setFilterState({
      filters: this.currentFilters,
      isOpen: false,
    });
  }

  clearFilters(): void {
    this.filtersService.clearFilters();
    this.currentFilters = {};
  }

  closeSidebar(): void {
    this.filtersService.setFilterState({
      isOpen: false,
    });
  }

  getFilterDisplayValue(filterType: keyof ArticuloFilter): string {
    const value = this.currentFilters[filterType];
    if (!value) return 'Todos';

    if (
      filterType === 'fechaCreacionInicio' ||
      filterType === 'fechaCreacionFin'
    ) {
      return value instanceof Date ? value.toLocaleDateString() : 'Todos';
    }

    return value.toString();
  }
}

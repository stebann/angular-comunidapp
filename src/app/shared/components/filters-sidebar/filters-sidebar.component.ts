import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ArticuloFilter } from '../../models/filter-models';
import { FiltersService } from '../../services/filters.service';
import { DropdownOption } from '../dropdown-field/dropdown-field.component';

@Component({
  selector: 'app-filters-sidebar',
  templateUrl: './filters-sidebar.component.html',
  styleUrls: ['./filters-sidebar.component.scss'],
})
export class FiltersSidebarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @Output() filtersApplied = new EventEmitter<any[]>();

  isOpen: boolean = false;
  currentFilters: ArticuloFilter = {};

  // Opciones para los dropdowns
  categoriaOptions: DropdownOption[] = [];
  estadoOptions: DropdownOption[] = [];
  tipoOptions: DropdownOption[] = [];

  constructor(private filtersService: FiltersService) {}

  ngOnInit(): void {
    // Suscribirse al estado de apertura/cierre del sidebar
    this.filtersService
      .isOpen$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isOpen) => {
        this.isOpen = isOpen;
      });

    // Suscribirse a los filtros actuales
    this.filtersService
      .getCurrentFilters$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((filters) => {
        this.currentFilters = { ...filters };
      });

    // Cargar opciones de filtros desde la API
    this.loadFilterOptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadFilterOptions(): void {
    // Cargar categorías desde la API
    this.filtersService
      .getCategorias()
      .pipe(takeUntil(this.destroy$))
      .subscribe((categorias) => {
        this.categoriaOptions = categorias.map((c) => ({
          value: String(c.id),
          label: c.nombre,
        }));
      });

    // Cargar estados desde la API
    this.filtersService
      .getEstados()
      .pipe(takeUntil(this.destroy$))
      .subscribe((estados) => {
        this.estadoOptions = estados.map((e) => ({
          value: String(e.id),
          label: e.nombre,
        }));
      });

    // Cargar tipos desde la API
    this.filtersService
      .getTipos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((tipos) => {
        this.tipoOptions = tipos.map((t) => ({
          value: String(t.id),
          label: t.nombre,
        }));
      });
  }

  onFilterChange(
    filterType: keyof ArticuloFilter,
    value: string | number | Event
  ): void {
    let actualValue: string | number | undefined;

    if (typeof value === 'string' || typeof value === 'number') {
      actualValue = value;
    } else {
      const target = value.target as HTMLInputElement;
      actualValue = target.value;
    }

    // Coerción a number para los campos *_Id
    if (
      (filterType === 'categoriaId' ||
        filterType === 'estadoId' ||
        filterType === 'tipoTransaccionId') &&
      typeof actualValue === 'string'
    ) {
      actualValue = actualValue ? Number(actualValue) : undefined;
    }

    if (actualValue === '') {
      actualValue = undefined;
    }

    this.currentFilters = {
      ...this.currentFilters,
      [filterType]: actualValue,
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
    // Llamar a la API con los filtros
    this.filtersService
      .filtrarArticulos(this.currentFilters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (filteredData) => {
          // Emitir los datos filtrados que devuelve la API
          this.filtersApplied.emit(filteredData);
          // Cerrar el sidebar
          this.filtersService.close();
        },
        error: (error) => {
          console.error('Error al filtrar artículos:', error);
        },
      });
  }

  clearFilters(): void {
    this.currentFilters = {};
  }

  closeSidebar(): void {
    this.filtersService.close();
  }

  getFilterDisplayValue(filterType: keyof ArticuloFilter): string {
    const value = this.currentFilters[filterType];
    if (value === undefined || value === null) return 'Todos';
    return String(value);
  }
}

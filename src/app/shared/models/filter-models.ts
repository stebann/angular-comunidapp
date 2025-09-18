export interface ArticuloFilter {
  categoria?: string;
  estado?: string;
  nombre?: string;
  fechaCreacionInicio?: Date;
  fechaCreacionFin?: Date;
  tipo?: 'prestamo' | 'venta' | 'todos';
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterState {
  isOpen: boolean;
  filters: ArticuloFilter;
  hasActiveFilters: boolean;
}

export interface FilterResult<T> {
  data: T[];
  totalCount: number;
  appliedFilters: ArticuloFilter;
}

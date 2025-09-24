export interface ArticuloFilter {
  nombreArticulo?: string;
  nombreUsuario?: string;
  categoriaId?: number;
  estadoId?: number;
  tipoTransaccionId?: number;
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

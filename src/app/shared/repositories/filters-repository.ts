import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ArticuloFilter,
  FilterResult,
  FilterState,
} from '../models/filter-models';

@Injectable()
export abstract class FiltersRepository {
  abstract getFilterState(): Observable<FilterState>;
  abstract setFilterState(state: Partial<FilterState>): void;
  abstract applyFilters<T>(data: T[], filters: ArticuloFilter): FilterResult<T>;
  abstract clearFilters(): void;
  abstract getFilterOptions(): {
    categorias: string[];
    estados: string[];
    tipos: string[];
  };
}

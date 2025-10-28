import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FiltersAPI } from '../../core/routes-api/filters_api';
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
  private categoriasSubject = new BehaviorSubject<FilterOption[]>([]);
  private estadosSubject = new BehaviorSubject<FilterOption[]>([]);
  private tiposSubject = new BehaviorSubject<FilterOption[]>([]);

  constructor(private http: HttpService) {
    this.initFilters();
  }

  // === Getters públicos (para usar en componentes) ===
  get categorias$(): Observable<FilterOption[]> {
    return this.categoriasSubject.asObservable();
  }

  get estados$(): Observable<FilterOption[]> {
    return this.estadosSubject.asObservable();
  }

  get tipos$(): Observable<FilterOption[]> {
    return this.tiposSubject.asObservable();
  }

  // === Inicializa todos los filtros ===
  private initFilters(): void {
    this.loadFilter(FiltersAPI.Categorias, this.categoriasSubject);
    this.loadFilter(FiltersAPI.Estados, this.estadosSubject);
    this.loadFilter(FiltersAPI.Tipos, this.tiposSubject);
  }

  // === Método genérico para cargar cualquier filtro ===
  private loadFilter(
    endpoint: string,
    subject: BehaviorSubject<FilterOption[]>
  ): void {
    this.http
      .get<RawFilter[]>(endpoint)
      .pipe(
        map((items: RawFilter[]) =>
          items.map((item: RawFilter) => ({
            value: item.id.toString(),
            label: item.nombre,
          }))
        )
      )
      .subscribe({
        next: (options: FilterOption[]) => subject.next(options),
        error: (err) => console.error(`Error cargando ${endpoint}:`, err),
      });
  }
}

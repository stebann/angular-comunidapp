import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FiltersAPI } from '../../core/routes-api/filters_api';
import { HttpService } from '../../core/services/http.service';
import { FilterOption } from '../models/filter-models';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  private categoriasSubject = new BehaviorSubject<FilterOption[]>([]);
  private estadosSubject = new BehaviorSubject<FilterOption[]>([]);
  private tiposSubject = new BehaviorSubject<FilterOption[]>([]);

  constructor(private httpService: HttpService) {
    this.loadCategorias();
    this.loadEstados();
    this.loadTipos();
  }

  getCategorias$(): Observable<FilterOption[]> {
    return this.categoriasSubject.asObservable();
  }

  getEstados$(): Observable<FilterOption[]> {
    return this.estadosSubject.asObservable();
  }

  getTipos$(): Observable<FilterOption[]> {
    return this.tiposSubject.asObservable();
  }

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

  private getTipos(): Observable<
    Array<{ id: string | number; nombre: string }>
  > {
    return this.httpService.get<Array<{ id: string | number; nombre: string }>>(
      FiltersAPI.Tipos
    );
  }

  private loadCategorias(): void {
    this.getCategorias().subscribe((categorias) => {
      const options = categorias.map((cat) => ({
        value: cat.id.toString(),
        label: cat.nombre,
      }));
      this.categoriasSubject.next(options);
    });
  }

  private loadEstados(): void {
    this.getEstados().subscribe((estados) => {
      const options = estados.map((estado) => ({
        value: estado.id.toString(),
        label: estado.nombre,
      }));
      this.estadosSubject.next(options);
    });
  }

  private loadTipos(): void {
    this.getTipos().subscribe((tipos) => {
      const options = tipos.map((tipo) => ({
        value: tipo.id.toString(),
        label: tipo.nombre,
      }));
      this.tiposSubject.next(options);
    });
  }
}

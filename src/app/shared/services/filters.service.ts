import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FiltrosAPI } from '../../core/routes-api/filtros_api';
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
  constructor(private http: HttpService) {}

  // Obtener categorías
  async getCategorias(): Promise<FilterOption[]> {
    const response = await firstValueFrom(
      this.http.get<RawFilter[]>(FiltrosAPI.Categorias)
    );
    return this.mapToFilterOptions(response);
  }

  // Obtener estados
  async getEstados(): Promise<FilterOption[]> {
    const response = await firstValueFrom(
      this.http.get<RawFilter[]>(FiltrosAPI.Estados)
    );
    return this.mapToFilterOptions(response);
  }

  // Obtener tipos de transacción
  async getTiposTransaccion(): Promise<FilterOption[]> {
    const response = await firstValueFrom(
      this.http.get<RawFilter[]>(FiltrosAPI.Tipos)
    );
    return this.mapToFilterOptions(response);
  }

  // Método privado para mapear la respuesta a FilterOption[]
  private mapToFilterOptions(data: RawFilter[]): FilterOption[] {
    return data.map((item) => ({
      value: String(item.id),
      label: item.nombre,
    }));
  }
}

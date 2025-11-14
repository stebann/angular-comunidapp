import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticuloAPI } from 'src/app/core/routes-api/articulo_api';
import { FiltrosAPI } from 'src/app/core/routes-api/filtros_api';
import { HttpService } from 'src/app/core/services/http.service';
import { Articulo } from '../models/articulo';
import { MisArticulosRepository } from '../repositories/mis-articulos-repository';

@Injectable({ providedIn: 'root' })
export class MisArticulosService extends MisArticulosRepository {
  public formNew = this.new();
  public formEdit = this.edit();
  public filtroMisArticulos = this.filtro();
  public articulos: Articulo[] = [];

  constructor(private http$: HttpService) {
    super();
  }

  crear(usuarioId: number, imagenes: File[]): Observable<any> {
    const url = `${ArticuloAPI.Crear}?usuarioId=${usuarioId}`;

    const formData = new FormData();
    const formValues = this.formNew.value;

    Object.keys(formValues).forEach((key) => {
      if (key !== 'imagenes' && formValues[key] != null) {
        formData.append(key, formValues[key]);
      }
    });

    imagenes.forEach((file) => {
      formData.append('imagenes', file, file.name);
    });

    return this.http$.postFormData(url, formData);
  }

  filtrar(): void {
    this.http$
      .post(FiltrosAPI.Buscar, this.filtroMisArticulos.value)
      .subscribe((response: any) => {
        this.articulos = response.data || [];
      });
  }

  getMisArticulos(usuarioId: number): void {
    const url = `${ArticuloAPI.PorUsuario}${usuarioId}`;
    this.http$.get(url).subscribe((response: any) => {
      this.articulos = Array.isArray(response) ? response : response.data || [];
    });
  }

  obtenerArticuloById(articuloId: number): Observable<any> {
    const url = `${ArticuloAPI.PorId}${articuloId}`;
    return this.http$.get(url);
  }

  actualizar(
    articuloId: number,
    imagenes?: File[],
    usuarioId?: number
  ): Observable<any> {
    // El backend requiere usuarioId como query parameter
    const url = usuarioId
      ? `${ArticuloAPI.PorId}${articuloId}?usuarioId=${usuarioId}`
      : `${ArticuloAPI.PorId}${articuloId}`;

    // El backend SIEMPRE espera FormData para actualizar
    const formData = new FormData();
    const formValues = this.formEdit.value;

    // Agregar todos los campos excepto 'id' (viene del path) e 'imagenes' (solo Files)
    Object.keys(formValues).forEach((key) => {
      if (key !== 'imagenes' && key !== 'id') {
        const value = formValues[key];
        // Enviar si no es null/undefined (incluye false para booleanos)
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      }
    });

    // Enviar todas las imágenes finales como Files
    // Si hay imágenes, se reemplazan todas; si no hay, se mantienen las existentes
    if (imagenes && imagenes.length > 0) {
      imagenes.forEach((file) => {
        formData.append('imagenes', file, file.name);
      });
    }

    return this.http$.putFormData(url, formData);
  }

  eliminar(articuloId: number, usuarioId: number): Observable<any> {
    const url = `${ArticuloAPI.Eliminar}${articuloId}?usuarioId=${usuarioId}`;
    return this.http$.delete(url);
  }
}

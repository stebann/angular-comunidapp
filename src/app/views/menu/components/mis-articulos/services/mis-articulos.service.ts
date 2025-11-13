import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticuloAPI } from 'src/app/core/routes-api/articulo_api';
import { FiltrosAPI } from 'src/app/core/routes-api/filtros_api';
import { HttpService } from 'src/app/core/services/http.service';
import { Articulo } from '../models/articulo';
import { MisArticulosRepository } from '../repositories/mis-articulos-repository';

@Injectable({ providedIn: 'root' })
export class MisArticulosService extends MisArticulosRepository {
  public formMisArticulos = this.form();
  public filtroMisArticulos = this.filtro();
  public articulos: Articulo[] = [];

  constructor(private http$: HttpService) {
    super();
  }

  crear(usuarioId: number, imagenes: File[]): Observable<any> {
    const url = `${ArticuloAPI.Crear}?usuarioId=${usuarioId}`;

    const formData = new FormData();
    const formValues = this.formMisArticulos.value;

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

  actualizar() {}

  eliminar(articuloId: number, usuarioId: number): Observable<any> {
    const url = `${ArticuloAPI.Eliminar}${articuloId}?usuarioId=${usuarioId}`;
    return this.http$.delete(url);
  }
}

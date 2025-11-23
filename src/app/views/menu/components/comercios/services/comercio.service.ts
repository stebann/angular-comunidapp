import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComerciosAPI } from 'src/app/core/routes-api/comercios_api';
import { FiltrosAPI } from 'src/app/core/routes-api/filtros_api';
import { HttpService } from 'src/app/core/services/http.service';
import { Comercio } from '../models/comercio.model';
import { ArticuloComercioRepository } from '../repositories/articulo-comercio-repository';
import { ComercioRepository } from '../repositories/comercio-repository';

@Injectable({ providedIn: 'root' })
export class ComercioService extends ComercioRepository {
  public comercios: Comercio[] = [];
  public filtroComercio = this.filtro();
  public filtroComercioDetalle = this.filtroDetalle();
  public formArticuloComercio = new ArticuloComercioRepository().form();

  constructor(private http$: HttpService) {
    super();
  }

  getComercios(): void {
    this.http$.get(ComerciosAPI.Base).subscribe((response: any) => {
      this.comercios = response || [];
    });
  }

  getComercioPorId(id: number): Observable<any> {
    return this.http$.get(`${ComerciosAPI.PorId}${id}`);
  }

  public filtrar(): void {
    this.http$
      .post(FiltrosAPI.Buscar, this.filtroComercio.value)
      .subscribe((response: any) => {
        this.comercios = response.data || [];
      });
  }

  public filtrarDetalle(): void {
    this.http$
      .post(ComerciosAPI.PorId, this.filtroComercioDetalle.value)
      .subscribe((response: any) => {
        this.comercios = response.data || [];
      });
  }

  crearArticuloComercio(comercioId: number, imagenes: File[]): Observable<any> {
    const url = `${ComerciosAPI.CrearArticulo}${comercioId}/articulos/crear`;

    const formData = new FormData();
    const formValues = this.formArticuloComercio.value;

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

  crearCategoriaComercio(comercioId: number, categoria: any): Observable<any> {
    const url = `${ComerciosAPI.CrearCategoria}${comercioId}/categorias/crear`;
    return this.http$.post(url, categoria);
  }

  actualizarCategoriaComercio(
    comercioId: number,
    categoriaId: number,
    categoria: any
  ): Observable<any> {
    const url = `${ComerciosAPI.CrearCategoria}${comercioId}/categorias/${categoriaId}`;
    return this.http$.put(url, categoria);
  }

  eliminarCategoriaComercio(
    comercioId: number,
    categoriaId: number
  ): Observable<any> {
    const url = `${ComerciosAPI.CrearCategoria}${comercioId}/categorias/${categoriaId}`;
    return this.http$.delete(url);
  }
}

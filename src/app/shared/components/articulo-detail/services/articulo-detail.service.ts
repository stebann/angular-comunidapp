import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticuloAPI } from 'src/app/core/routes-api/articulo_api';
import { HttpService } from 'src/app/core/services/http.service';
import { Articulo } from '../../../models/articulo.model';
import { ArticuloDetailRepository } from '../repositories/articulo-detail-repository';

@Injectable({ providedIn: 'root' })
export class ArticuloDetailService extends ArticuloDetailRepository {
  public detailForm = this.detalle();

  constructor(private http$: HttpService) {
    super();
  }

  obtenerArticuloById(articuloId: number): Observable<Articulo> {
    const url = `${ArticuloAPI.PorId}${articuloId}`;
    return this.http$.get(url);
  }

  cargarArticulo(articuloId: number): void {
    this.obtenerArticuloById(articuloId).subscribe((articulo: Articulo) => {
      this.detailForm.patchValue({
        id: articulo.id,
        titulo: articulo.titulo,
        descripcion: articulo.descripcion,
        categoriaCodigo: articulo.categoriaCodigo,
        categoriaNombre: articulo.categoriaNombre,
        condicionCodigo: articulo.condicionCodigo,
        condicionNombre: articulo.condicionNombre,
        estadoArticuloCodigo: articulo.estadoArticuloCodigo,
        estadoArticuloNombre: articulo.estadoArticuloNombre,
        tipoTransaccionCodigo: articulo.tipoTransaccionCodigo,
        tipoTransaccionNombre: articulo.tipoTransaccionNombre,
        precio: articulo.precio,
        imagenes: articulo.imagenes,
        creadoEn: articulo.creadoEn,
      });
    });
  }
}

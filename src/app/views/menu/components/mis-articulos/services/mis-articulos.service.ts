import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticuloAPI } from 'src/app/core/routes-api/articulo_api';
import { HttpService } from 'src/app/core/services/http.service';
import { CrearArticuloDto } from '../models/crear-articulo';
import { MisArticulosRepository } from '../repositories/mis-articulos-repository';

@Injectable({ providedIn: 'root' })
export class MisArticulosService extends MisArticulosRepository {
  public formMisArticulos = this.form();
  public filtroMisArticulos = this.filtro();
  public articulos: any[] = [];

  constructor(private http$: HttpService) {
    super();
  }

  crear(usuarioId: number, data: CrearArticuloDto): Observable<any> {
    const url = `${ArticuloAPI.Crear}?usuarioId=${usuarioId}`;
    return this.http$.post(url, data);
  }

  filtrar(): void {
    this.http$
      .post('/filtro/articulos', this.filtroMisArticulos.value)
      .subscribe((response: any) => {
        this.articulos = response.data;
      });
  }

  getMisArticulos(usuarioId: number): void {
    const url = `${ArticuloAPI.PorUsuario}${usuarioId}`;
    this.http$.get(url).subscribe((response: any) => {
      this.articulos = response.data;
    });
  }
}

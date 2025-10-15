import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticuloAPI } from 'src/app/core/routes-api/articulo_api';
import { HttpService } from 'src/app/core/services/http.service';
import { CrearArticuloDto } from '../models/crear-articulo';
import { MisArticulosRepository } from '../repositories/mis-articulos-repository';

@Injectable({ providedIn: 'root' })
export class MisArticulosService extends MisArticulosRepository {
  public formMisArticulos = this.form();
  public articulos: any[] = [];

  constructor(private http$: HttpService) {
    super();
  }

  crear(usuarioId: number, data: CrearArticuloDto): Observable<any> {
    const url = `${ArticuloAPI.Crear}?usuarioId=${usuarioId}`;
    return this.http$.post(url, data);
  }
}

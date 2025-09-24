import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticuloAPI } from 'src/app/core/routes-api/articulo_api';
import { HttpService } from 'src/app/core/services/http.service';
import { MisArticulosRepository } from '../repositories/mis-articulos-repository';

export interface CrearArticuloDto {
  titulo: string;
  descripcion: string;
  categoriaId: number;
  estadoId: number;
  tipoTransaccionId: number;
  precio: number;
  imagenes: string[];
  disponible: boolean;
}

@Injectable({ providedIn: 'root' })
export class ArticulosService extends MisArticulosRepository {
  public formMisArticulos = this.form();
  public articulos: any[] = [];


  constructor(private http$: HttpService) { super(); }

  crear(usuarioId: number, data: CrearArticuloDto): Observable<any> {
    const url = `${ArticuloAPI.Crear}?usuarioId=${usuarioId}`;
    return this.http$.post(url, data);
  }
}



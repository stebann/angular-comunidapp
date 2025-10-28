import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExplorarAPI } from 'src/app/core/routes-api/explorar_api';
import { HttpService } from 'src/app/core/services/http.service';
import { ExplorarRepository } from '../repositories/explorar-repository';

@Injectable({ providedIn: 'root' })
export class ExplorarService extends ExplorarRepository {
  public filtroExplorar = this.filtro();
  public articulos: any[] = [];

  constructor(private http$: HttpService) {
    super();
  }

  filtrar(): void {
    this.http$
      .post(ExplorarAPI.Filtro, this.filtroExplorar.value)
      .subscribe((response: any) => {
        this.articulos = response.data;
      });
  }

  getArticulos(): Observable<any> {
    return this.http$.get(ExplorarAPI.Base);
  }
}

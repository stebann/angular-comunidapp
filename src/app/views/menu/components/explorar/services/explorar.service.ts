import { Injectable } from '@angular/core';
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
      .post('/filtro/articulos', this.filtroExplorar.value)
      .subscribe((response: any) => {
        this.articulos = response.data;
      });
  }
}

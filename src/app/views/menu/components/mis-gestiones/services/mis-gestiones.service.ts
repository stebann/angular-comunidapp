import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { MisGestionesRepository } from '../repositories/mis-gestiones-repository';

@Injectable({ providedIn: 'root' })
export class MisGestionesService extends MisGestionesRepository {
  public gestiones: any[] = [];
  public filtroGestiones = this.filtro();

  constructor(private http$: HttpService) {
    super();
  }

  public filtrar(): void {
    this.http$
      .post('/filtro/gestiones', this.filtroGestiones.value)
      .subscribe((response: any) => {
        this.gestiones = response.data;
      });
  }
}

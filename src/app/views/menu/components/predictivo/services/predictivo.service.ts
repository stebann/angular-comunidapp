import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PredictivoAPI } from 'src/app/core/routes-api/predictivo_api';
import { HttpService } from 'src/app/core/services/http.service';
import { ModelosPredictivos } from '../models/predictivo.model';

@Injectable({ providedIn: 'root' })
export class PredictivoService {
  constructor(private http$: HttpService) {}

  getDashboardGlobal(): Observable<ModelosPredictivos['modelosGlobales']> {
    return this.http$.get<ModelosPredictivos['modelosGlobales']>(
      PredictivoAPI.Globales
    );
  }

  getDashboardUsuario(
    usuarioId: number
  ): Observable<ModelosPredictivos['modelosUsuario']> {
    return this.http$.get<ModelosPredictivos['modelosUsuario']>(
      `${PredictivoAPI.Usuario}${usuarioId}`
    );
  }

  getDashboardCompleto(usuarioId: number): Observable<ModelosPredictivos> {
    return this.http$.get<ModelosPredictivos>(
      `${PredictivoAPI.Completo}${usuarioId}`
    );
  }
}

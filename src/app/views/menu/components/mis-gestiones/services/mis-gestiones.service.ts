import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MisGestionesAPI } from 'src/app/core/routes-api/mis_gestiones_api';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { Gestion } from '../models/gestiones.model';
import { MisGestionesRepository } from '../repositories/mis-gestiones-repository';

@Injectable({ providedIn: 'root' })
export class MisGestionesService extends MisGestionesRepository {
  public filtroMisGestiones: FormGroup = this.filtro();
  public gestiones: Gestion[] = [];
  public solicitudesRecibidas: Gestion[] = [];
  public solicitudesEnviadas: Gestion[] = [];
  public prestamosRecibidos: Gestion[] = [];
  public prestamosOtorgados: Gestion[] = [];

  constructor(private http$: HttpService, private authService: AuthService) {
    super();
  }

  private getCurrentUserId(): number {
    return this.authService.currentState.id;
  }

  getSolicitudesUsuario(): Observable<Gestion[]> {
    const usuarioId = this.getCurrentUserId();
    return new Observable((observer) => {
      this.http$
        .get<Gestion[]>(`${MisGestionesAPI.Solicitudes}${usuarioId}`)
        .subscribe({
          next: (data) => {
            this.gestiones = data || [];

            // Separar en solicitudes recibidas (donde el usuario es el propietario)
            this.solicitudesRecibidas = this.gestiones.filter(
              (gestion: Gestion) => gestion.propietarioId === usuarioId
            );

            // Las solicitudes enviadas son donde el usuario es el solicitante
            this.solicitudesEnviadas = this.gestiones.filter(
              (gestion: Gestion) => gestion.solicitante.id === usuarioId
            );
          },
          error: (err) => observer.error(err),
        });
    });
  }

  getPrestamosUsuario(): Observable<Gestion[]> {
    const usuarioId = this.getCurrentUserId();
    return new Observable((observer) => {
      this.http$
        .get<Gestion[]>(`${MisGestionesAPI.Prestamos}${usuarioId}`)
        .subscribe({
          next: (data) => {
            this.gestiones = data || [];

            // Préstamos recibidos: donde el usuario es el propietario del artículo
            this.prestamosRecibidos = this.gestiones.filter(
              (gestion: Gestion) => gestion.propietarioId === usuarioId
            );

            // Préstamos otorgados: donde el usuario es el solicitante
            this.prestamosOtorgados = this.gestiones.filter(
              (gestion: Gestion) => gestion.solicitante.id === usuarioId
            );
          },
          error: (err) => observer.error(err),
        });
    });
  }

  // Obtener una solicitud por ID
  getSolicitud(solicitudId: number): Observable<Gestion> {
    return this.http$.get<Gestion>(`${MisGestionesAPI.ById}${solicitudId}`);
  }

  // Cambiar estado de una solicitud
  cambiarEstadoSolicitud(
    solicitudId: number,
    estadoCodigo: number
  ): Observable<any> {
    return this.http$.put(
      `${MisGestionesAPI.ById}${solicitudId}${MisGestionesAPI.CambiarEstado}?estadoCodigo=${estadoCodigo}`,
      {}
    );
  }

  // Crear una nueva solicitud
  crearSolicitud(
    articuloId: number,
    mensaje: string | null,
    fechaEstimadaDevolucion: string | Date | null
  ): Observable<any> {
    const usuarioId = this.getCurrentUserId();
    const url = `${MisGestionesAPI.Post}?usuarioId=${usuarioId}`;

    // Convertir la fecha a formato ISO string si es un Date
    let fechaFormato: string | null = null;
    if (fechaEstimadaDevolucion) {
      if (fechaEstimadaDevolucion instanceof Date) {
        fechaFormato = fechaEstimadaDevolucion.toISOString();
      } else {
        fechaFormato = fechaEstimadaDevolucion;
      }
    }

    const body = {
      articuloId,
      mensaje: mensaje || null,
      fechaEstimadaDevolucion: fechaFormato,
    };

    return this.http$.post(url, body);
  }
}

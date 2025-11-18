import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MisGestionesAPI } from 'src/app/core/routes-api/mis_gestiones_api';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { Solicitud } from '../models/solicitud.model';
import { Gestion } from '../models/gestion.model';
import { MisGestionesRepository } from '../repositories/mis-gestiones-repository';

@Injectable({ providedIn: 'root' })
export class MisGestionesService extends MisGestionesRepository {
  public filtroMisGestiones: FormGroup = this.filtro();
  public gestiones: Solicitud[] = [];
  public solicitudesRecibidas: Solicitud[] = [];
  public solicitudesEnviadas: Solicitud[] = [];
  public prestamosRecibidos: Solicitud[] = [];
  public prestamosOtorgados: Solicitud[] = [];

  // Propiedad para almacenar los conteos
  public conteos: {
    solicitudesEnviadas: number;
    solicitudesRecibidas: number;
    prestamosActivos: number;
    prestamosOtorgados: number;
  } = {
    solicitudesEnviadas: 0,
    solicitudesRecibidas: 0, 
    prestamosActivos: 0,
    prestamosOtorgados: 0,
  };

  constructor(private http$: HttpService, private authService: AuthService) {
    super();
  }

  private getCurrentUserId(): number {
    return this.authService.currentState.id;
  }

  getSolicitudesRecibidas(): Observable<Solicitud[]> {
    const usuarioId = this.getCurrentUserId();
    return new Observable((observer) => {
      this.http$
        .get<Solicitud[]>(`${MisGestionesAPI.SolicitudesRecibidas}${usuarioId}`)
        .subscribe({
          next: (data) => {
            this.solicitudesRecibidas = data || [];
            observer.next(this.solicitudesRecibidas);
          },
          error: (err) => observer.error(err),
        });
    });
  }

  getSolicitudesEnviadas(): Observable<Solicitud[]> {
    const usuarioId = this.getCurrentUserId();
    return new Observable((observer) => {
      this.http$
        .get<Solicitud[]>(`${MisGestionesAPI.SolicitudesEnviadas}${usuarioId}`)
        .subscribe({
          next: (data) => {
            this.solicitudesEnviadas = data || [];
            observer.next(this.solicitudesEnviadas);
          },
          error: (err) => observer.error(err),
        });
    });
  }

  getPrestamosActivos(): Observable<Solicitud[]> {
    const usuarioId = this.getCurrentUserId();
    return new Observable((observer) => {
      this.http$
        .get<Solicitud[]>(`${MisGestionesAPI.PrestamosActivos}${usuarioId}`)
        .subscribe({
          next: (data) => {
            this.prestamosRecibidos = data || [];
            observer.next(this.prestamosRecibidos);
          },
          error: (err) => observer.error(err),
        });
    });
  }

  getPrestamosOtorgados(): Observable<Solicitud[]> {
    const usuarioId = this.getCurrentUserId();
    return new Observable((observer) => {
      this.http$
        .get<Solicitud[]>(`${MisGestionesAPI.PrestamosOtorgados}${usuarioId}`)
        .subscribe({
          next: (data) => {
            this.prestamosOtorgados = data || [];
            observer.next(this.prestamosOtorgados);
          },
          error: (err) => observer.error(err),
        });
    });
  }

  getConteosUsuario(): Observable<any> {
    const usuarioId = this.getCurrentUserId();
    return new Observable((observer) => {
      this.http$.get(`${MisGestionesAPI.Conteos}${usuarioId}`).subscribe({
        next: (data) => {
          this.conteos = data || {
            solicitudesEnviadas: 0,
            solicitudesRecibidas: 0,
            prestamosActivos: 0,
            prestamosOtorgados: 0,
          };
          observer.next(this.conteos);
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
    estadoCodigo: number,
    mensajeRespuesta?: string
  ): Observable<any> {
    const url = `${MisGestionesAPI.CambiarEstado}/${solicitudId}`;
    const body = {
      estadoCodigo,
      mensajeRespuesta: mensajeRespuesta || null,
    };
    return this.http$.put(url, body);
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

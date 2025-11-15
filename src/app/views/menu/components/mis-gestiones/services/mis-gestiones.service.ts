import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { MisGestionesRepository } from '../repositories/mis-gestiones-repository';
import { MisGestionesAPI } from 'src/app/core/routes-api/mis_gestiones_api';
import { Gestion } from '../models/gestiones.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MisGestionesService extends MisGestionesRepository {
  public filtroMisGestiones: FormGroup = this.filtro();
  public gestiones: Gestion[] = [];
  public solicitudesRecibidas: Gestion[] = [];
  public solicitudesEnviadas: Gestion[] = [];
  public prestamosRecibidos: Gestion[] = [];
  public prestamosOtorgados: Gestion[] = [];


  constructor(
    private http$: HttpService,
    private authService: AuthService
  ) {
    super();
  }

  private getCurrentUserId(): number {
    return this.authService.currentState.id;
  }

   getSolicitudesUsuario(): Observable<Gestion[]> {
    const usuarioId = this.getCurrentUserId();
    return new Observable(observer => {
      this.http$.get<Gestion[]>(`${MisGestionesAPI.Solicitudes}${usuarioId}`).subscribe({
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
        error: (err) => observer.error(err)
      });
    });
  }

   getPrestamosUsuario(): Observable<Gestion[]> {
    const usuarioId = this.getCurrentUserId();
    return new Observable(observer => {
      this.http$.get<Gestion[]>(`${MisGestionesAPI.Prestamos}${usuarioId}`).subscribe({
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
        error: (err) => observer.error(err)
      });
    });
  }

  // Obtener una solicitud por ID
   getSolicitud(solicitudId: number): Observable<Gestion> {
    return this.http$.get<Gestion>(`${MisGestionesAPI.ById}${solicitudId}`);
  }

  // Cambiar estado de una solicitud
   cambiarEstadoSolicitud(solicitudId: number, estadoCodigo: number): Observable<any> {
    return this.http$.put(`${MisGestionesAPI.ById}${solicitudId}${MisGestionesAPI.CambiarEstado}?estadoCodigo=${estadoCodigo}`, {});
  }

  // Crear una nueva solicitud
   crearSolicitud(articuloId: number, mensaje: string): Observable<any> {
    const usuarioId = this.getCurrentUserId();
    return this.http$.post(MisGestionesAPI.Post, { articuloId, mensaje, usuarioId });
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppMessagesServices } from 'src/app/core/services/toas.service';
import { EstadoSolicitudPremium } from './enums/estado-solicitud-premium.enum';
import { SolicitudPremium } from './models/solicitud-premium.model';
import { AdminGestionPremiumService } from './services/admin-gestion-premium.service';

@Component({
  selector: 'app-admin-gestion-premium',
  templateUrl: './admin-gestion-premium.component.html',
  styleUrls: ['./admin-gestion-premium.component.scss'],
})
export class AdminGestionPremiumComponent implements OnInit {
  solicitudes: SolicitudPremium[] = [];
  searchTerm: string = '';
  isOpen: boolean = false;
  solicitudSeleccionada: SolicitudPremium | null = null;
  opcionesCache: Map<number, any[]> = new Map();

  constructor(
    public adminGestionPremiumService: AdminGestionPremiumService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private appMessages: AppMessagesServices
  ) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.adminGestionPremiumService
      .obtenerSolicitudesPremium()
      .subscribe((solicitudes: SolicitudPremium[]) => {
        this.solicitudes = solicitudes;
        this.opcionesCache.clear();
        this.cdr.detectChanges();
      });
  }

  get solicitudesFiltradas(): SolicitudPremium[] {
    let filtradas = [...this.solicitudes];

    const term = this.searchTerm?.trim().toLowerCase();
    if (term) {
      filtradas = filtradas.filter(
        (s) =>
          s.usuarioNombre.toLowerCase().includes(term) ||
          s.usuarioEmail.toLowerCase().includes(term) ||
          s.usuarioTelefono.toLowerCase().includes(term) ||
          s.estadoNombre.toLowerCase().includes(term)
      );
    }

    return filtradas;
  }

  get filtro() {
    return this.adminGestionPremiumService.filtroForm;
  }

  openFilters(): void {
    this.isOpen = true;
  }

  onFiltersApplied(): void {}

  aprobarSolicitud(): void {
    if (!this.solicitudSeleccionada) return;

    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas aprobar la solicitud premium de ${this.solicitudSeleccionada.usuarioNombre}?`,
      header: 'Confirmar Aprobación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (!this.solicitudSeleccionada) return;
        const adminId = this.authService.currentState.id;

        this.adminGestionPremiumService
          .cambiarEstadoSolicitud(
            this.solicitudSeleccionada.id,
            adminId,
            EstadoSolicitudPremium.Aceptada
          )
          .subscribe(() => {
            this.appMessages.exito(
              `Solicitud de ${
                this.solicitudSeleccionada!.usuarioNombre
              } aprobada exitosamente`,
              'Solicitud Aprobada'
            );
            this.cargarSolicitudes();
            this.solicitudSeleccionada = null;
          });
      },
    });
  }

  aprobarSolicitudFor(solicitud: SolicitudPremium): void {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas aprobar la solicitud premium de ${solicitud.usuarioNombre}?`,
      header: 'Confirmar Aprobación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const adminId = this.authService.currentState.id;

        this.adminGestionPremiumService
          .cambiarEstadoSolicitud(
            solicitud.id,
            adminId,
            EstadoSolicitudPremium.Aceptada
          )
          .subscribe(() => {
            this.appMessages.exito(
              `Solicitud de ${solicitud.usuarioNombre} aprobada exitosamente`,
              'Solicitud Aprobada'
            );
            this.cargarSolicitudes();
          });
      },
    });
  }

  rechazarSolicitud(): void {
    if (!this.solicitudSeleccionada) return;

    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas rechazar la solicitud premium de ${this.solicitudSeleccionada.usuarioNombre}?`,
      header: 'Confirmar Rechazo',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (!this.solicitudSeleccionada) return;
        const adminId = this.authService.currentState.id;

        this.adminGestionPremiumService
          .cambiarEstadoSolicitud(
            this.solicitudSeleccionada.id,
            adminId,
            EstadoSolicitudPremium.Rechazada
          )
          .subscribe(() => {
            this.appMessages.exito(
              `Solicitud de ${
                this.solicitudSeleccionada!.usuarioNombre
              } rechazada`,
              'Solicitud Rechazada'
            );
            this.cargarSolicitudes();
            this.solicitudSeleccionada = null;
          });
      },
    });
  }

  rechazarSolicitudFor(solicitud: SolicitudPremium): void {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas rechazar la solicitud premium de ${solicitud.usuarioNombre}?`,
      header: 'Confirmar Rechazo',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const adminId = this.authService.currentState.id;

        this.adminGestionPremiumService
          .cambiarEstadoSolicitud(
            solicitud.id,
            adminId,
            EstadoSolicitudPremium.Rechazada
          )
          .subscribe(() => {
            this.appMessages.exito(
              `Solicitud de ${solicitud.usuarioNombre} rechazada`,
              'Solicitud Rechazada'
            );
            this.cargarSolicitudes();
          });
      },
    });
  }

  suspenderSolicitud(): void {
    if (!this.solicitudSeleccionada) return;

    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas suspender la solicitud premium de ${this.solicitudSeleccionada.usuarioNombre}?`,
      header: 'Confirmar Suspensión',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (!this.solicitudSeleccionada) return;
        const adminId = this.authService.currentState.id;

        this.adminGestionPremiumService
          .cambiarEstadoSolicitud(
            this.solicitudSeleccionada.id,
            adminId,
            EstadoSolicitudPremium.Suspendida
          )
          .subscribe(() => {
            this.appMessages.exito(
              `Solicitud de ${
                this.solicitudSeleccionada!.usuarioNombre
              } suspendida`,
              'Solicitud Suspendida'
            );
            this.cargarSolicitudes();
            this.solicitudSeleccionada = null;
          });
      },
    });
  }

  suspenderSolicitudFor(solicitud: SolicitudPremium): void {
    console.log('suspenderSolicitudFor llamado con:', solicitud);
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas suspender la solicitud premium de ${solicitud.usuarioNombre}?`,
      header: 'Confirmar Suspensión',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const adminId = this.authService.currentState.id;

        this.adminGestionPremiumService
          .cambiarEstadoSolicitud(
            solicitud.id,
            adminId,
            EstadoSolicitudPremium.Suspendida
          )
          .subscribe(() => {
            this.appMessages.exito(
              `Solicitud de ${solicitud.usuarioNombre} suspendida`,
              'Solicitud Suspendida'
            );
            this.cargarSolicitudes();
          });
      },
    });
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  getEstadoClass(estadoNombre: string): string {
    const estado = estadoNombre.toLowerCase();
    if (estado.includes('pendiente')) return 'pendiente';
    if (estado.includes('aprobada') || estado.includes('aprobado'))
      return 'aprobada';
    if (estado.includes('rechazada') || estado.includes('rechazado'))
      return 'rechazada';
    if (estado.includes('suspendida') || estado.includes('suspendido'))
      return 'suspendida';
    return '';
  }

  getOpcionesFor(solicitud: SolicitudPremium): any[] {
    if (this.opcionesCache.has(solicitud.id)) {
      return this.opcionesCache.get(solicitud.id)!;
    }

    const opciones: any[] = [];

    if (solicitud.estadoCodigo === EstadoSolicitudPremium.Pendiente) {
      opciones.push(
        {
          icon: 'pi pi-check',
          label: 'Aprobar',
          command: (() => this.aprobarSolicitudFor(solicitud)).bind(this),
        },
        {
          icon: 'pi pi-times',
          label: 'Rechazar',
          command: (() => this.rechazarSolicitudFor(solicitud)).bind(this),
        }
      );
    }

    if (solicitud.estadoCodigo === EstadoSolicitudPremium.Aceptada) {
      opciones.push({
        icon: 'pi pi-pause',
        label: 'Suspender',
        command: (() => this.suspenderSolicitudFor(solicitud)).bind(this),
      });
    }

    this.opcionesCache.set(solicitud.id, opciones);
    return opciones;
  }
}

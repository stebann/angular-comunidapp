import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmModalService } from 'src/app/core/services/confirm-modal.service';
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
  menuItems: any[] = [];

  constructor(
    public adminGestionPremiumService: AdminGestionPremiumService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private confirmModal: ConfirmModalService,
    private appMessages: AppMessagesServices
  ) {}

  ngOnInit(): void {
    this.cargarSolicitudes();

    this.menuItems = [
      {
        icon: 'pi pi-eye',
        label: 'Ver',
        command: () => {
          this.verDetalles();
        },
      },
      {
        icon: 'pi pi-check',
        label: 'Aprobar',
        command: () => {
          this.aprobarSolicitud();
        },
        visible: () =>
          this.solicitudSeleccionada?.estadoCodigo ===
          EstadoSolicitudPremium.Pendiente,
      },
      {
        icon: 'pi pi-times',
        label: 'Rechazar',
        command: () => {
          this.rechazarSolicitud();
        },
        visible: () =>
          this.solicitudSeleccionada?.estadoCodigo ===
          EstadoSolicitudPremium.Pendiente,
      },
    ];
  }

  cargarSolicitudes(): void {
    this.adminGestionPremiumService
      .obtenerSolicitudesPremium()
      .subscribe((solicitudes: SolicitudPremium[]) => {
        this.solicitudes = solicitudes;
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

  verDetalles(): void {
    if (!this.solicitudSeleccionada) return;
    console.log('Ver detalles:', this.solicitudSeleccionada);
  }

  aprobarSolicitud(): void {
    if (!this.solicitudSeleccionada) return;

    this.confirmModal
      .confirm({
        title: 'Confirmar Aprobación',
        message: `¿Estás seguro de que deseas aprobar la solicitud premium de ${this.solicitudSeleccionada.usuarioNombre}?`,
        icon: 'pi pi-check-circle',
        acceptLabel: 'Aprobar',
        cancelLabel: 'Cancelar',
      })
      .subscribe((confirmed) => {
        if (confirmed && this.solicitudSeleccionada) {
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
        }
      });
  }

  rechazarSolicitud(): void {
    if (!this.solicitudSeleccionada) return;

    this.confirmModal
      .confirm({
        title: 'Confirmar Rechazo',
        message: `¿Estás seguro de que deseas rechazar la solicitud premium de ${this.solicitudSeleccionada.usuarioNombre}?`,
        icon: 'pi pi-times-circle',
        acceptLabel: 'Rechazar',
        cancelLabel: 'Cancelar',
      })
      .subscribe((confirmed) => {
        if (confirmed && this.solicitudSeleccionada) {
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
        }
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
    return '';
  }
}

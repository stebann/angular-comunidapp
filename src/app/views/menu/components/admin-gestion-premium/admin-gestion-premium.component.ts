import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(
    public adminGestionPremiumService: AdminGestionPremiumService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.adminGestionPremiumService.getSolicitudesPendientes().subscribe({
      next: (solicitudes: SolicitudPremium[]) => {
        this.solicitudes = solicitudes;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar solicitudes:', error);
      },
    });
  }

  get solicitudesFiltradas(): SolicitudPremium[] {
    let filtradas = [...this.solicitudes];

    const term = this.searchTerm?.trim().toLowerCase();
    if (term) {
      filtradas = filtradas.filter(
        (s) =>
          s.id.toString().includes(term) ||
          s.usuarioId.toString().includes(term) ||
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

  verDetalles(solicitud: SolicitudPremium): void {
    // TODO: Implementar ver detalles
    console.log('Ver detalles:', solicitud);
  }

  aprobarSolicitud(solicitud: SolicitudPremium): void {
    // TODO: Implementar aprobar solicitud
    console.log('Aprobar solicitud:', solicitud);
  }

  rechazarSolicitud(solicitud: SolicitudPremium): void {
    // TODO: Implementar rechazar solicitud
    console.log('Rechazar solicitud:', solicitud);
  }

  getOpcionesFor(solicitud: SolicitudPremium): any[] {
    return [
      {
        icon: 'pi pi-eye',
        label: 'Ver',
        command: () => this.verDetalles(solicitud),
      },
      {
        icon: 'pi pi-check',
        label: 'Aprobar',
        command: () => this.aprobarSolicitud(solicitud),
      },
      {
        icon: 'pi pi-times',
        label: 'Rechazar',
        command: () => this.rechazarSolicitud(solicitud),
      },
    ];
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { GestionDetailComponent } from './components/gestion-detail/gestion-detail.component';
import { Solicitud } from './models/solicitud.model';
import { MisGestionesService } from './services/mis-gestiones.service';

@Component({
  selector: 'app-mis-gestiones',
  templateUrl: './mis-gestiones.component.html',
  styleUrls: ['./mis-gestiones.component.scss'],
})
export class MisGestionesComponent implements OnInit {
  searchTerm: string = '';
  activeTab:
    | 'solicitudes-recibidas'
    | 'solicitudes-enviadas'
    | 'prestamos-activos'
    | 'prestamos-otorgados'
    | null = null;

  opciones = [
    { label: 'Solicitudes Recibidas', value: 1 },
    { label: 'Solicitudes Enviadas', value: 2 },
    { label: 'Préstamos Activos', value: 3 },
    { label: 'Préstamos Otorgados', value: 4 },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialogService$: DialogService,
    public misGestionesService: MisGestionesService
  ) {}

  ngOnInit(): void {
    this.misGestionesService.getConteosUsuario().subscribe();

    const currentRoute =
      this.route.snapshot.url[this.route.snapshot.url.length - 1]?.path;

    switch (currentRoute) {
      case 'solicitudes-recibidas':
        this.activeTab = 'solicitudes-recibidas';
        break;
      case 'solicitudes-enviadas':
        this.activeTab = 'solicitudes-enviadas';
        break;
      case 'prestamos-activos':
        this.activeTab = 'prestamos-activos';
        break;
      case 'prestamos-otorgados':
        this.activeTab = 'prestamos-otorgados';
        break;
      default:
        this.activeTab = null;
    }

    if (this.activeTab) {
      this.loadDataForTab(this.activeTab);
    }
  }

  checkIfDataAlreadyLoaded(tab: string): boolean {
    switch (tab) {
      case 'solicitudes-recibidas':
        return (this.misGestionesService.solicitudesRecibidas?.length || 0) > 0;
      case 'solicitudes-enviadas':
        return (this.misGestionesService.solicitudesEnviadas?.length || 0) > 0;
      case 'prestamos-activos':
        return (this.misGestionesService.prestamosRecibidos?.length || 0) > 0;
      case 'prestamos-otorgados':
        return (this.misGestionesService.prestamosOtorgados?.length || 0) > 0;
      default:
        return false;
    }
  }

  loadDataForTab(tab: string): void {
    switch (tab) {
      case 'solicitudes-recibidas':
        this.misGestionesService.getSolicitudesRecibidas().subscribe();
        break;
      case 'solicitudes-enviadas':
        this.misGestionesService.getSolicitudesEnviadas().subscribe();
        break;
      case 'prestamos-activos':
        this.misGestionesService.getPrestamosActivos().subscribe();
        break;
      case 'prestamos-otorgados':
        this.misGestionesService.getPrestamosOtorgados().subscribe();
        break;
    }
  }

  forceLoadDataForTab(tab: string): void {
    switch (tab) {
      case 'solicitudes-recibidas':
        this.misGestionesService.getSolicitudesRecibidas().subscribe();
        break;
      case 'solicitudes-enviadas':
        this.misGestionesService.getSolicitudesEnviadas().subscribe();
        break;
      case 'prestamos-activos':
        this.misGestionesService.getPrestamosActivos().subscribe();
        break;
      case 'prestamos-otorgados':
        this.misGestionesService.getPrestamosOtorgados().subscribe();
        break;
    }
  }

  get solicitudesRecibidas() {
    return this.misGestionesService.solicitudesRecibidas;
  }

  get solicitudesEnviadas() {
    return this.misGestionesService.solicitudesEnviadas;
  }

  get prestamosActivos() {
    return this.misGestionesService.prestamosRecibidos;
  }

  get prestamosOtorgados() {
    return this.misGestionesService.prestamosOtorgados;
  }

  get solicitudesActuales(): Solicitud[] {
    switch (this.activeTab) {
      case 'solicitudes-recibidas':
        return this.solicitudesRecibidas;
      case 'solicitudes-enviadas':
        return this.solicitudesEnviadas;
      case 'prestamos-activos':
        return this.prestamosActivos;
      case 'prestamos-otorgados':
        return this.prestamosOtorgados;
      default:
        return [];
    }
  }

  get solicitudesFiltradas(): Solicitud[] {
    if (!this.searchTerm.trim()) {
      return this.solicitudesActuales || [];
    }

    const termino = this.searchTerm.toLowerCase();
    return (this.solicitudesActuales || []).filter(
      (solicitud) =>
        (solicitud.nombreArticulo?.toLowerCase() || '').includes(termino) ||
        (solicitud.mensaje?.toLowerCase() || '').includes(termino) ||
        (solicitud.solicitante?.nombre?.toLowerCase() || '').includes(termino)
    );
  }

  onTabChange(
    tab:
      | 'solicitudes-recibidas'
      | 'solicitudes-enviadas'
      | 'prestamos-activos'
      | 'prestamos-otorgados'
  ): void {
    if (this.activeTab === tab) {
      return;
    }

    this.router.navigate(['/app/mis-gestiones', tab]);
  }

  getTotalSolicitudes(): number {
    return (
      (this.solicitudesRecibidas?.length || 0) +
      (this.solicitudesEnviadas?.length || 0)
    );
  }

  getTotalPrestamos(): number {
    return (
      (this.prestamosActivos?.length || 0) +
      (this.prestamosOtorgados?.length || 0)
    );
  }

  getTotalRecibidas(): number {
    switch (this.activeTab) {
      case 'solicitudes-recibidas':
        return this.solicitudesRecibidas?.length || 0;
      case 'prestamos-activos':
        return this.prestamosActivos?.length || 0;
      default:
        return 0;
    }
  }

  getSearchPlaceholder(): string {
    switch (this.activeTab) {
      case 'solicitudes-recibidas':
        return 'Buscar solicitudes recibidas...';
      case 'solicitudes-enviadas':
        return 'Buscar solicitudes enviadas...';
      case 'prestamos-activos':
        return 'Buscar préstamos activos...';
      case 'prestamos-otorgados':
        return 'Buscar préstamos otorgados...';
      default:
        return 'Buscar...';
    }
  }

  openModal(solicitud: Solicitud): void {
    const ref = this.dialogService$.open(GestionDetailComponent, {
      header: 'Detalle de Gestión',
      width: '50vw',
      height: 'auto',
      data: {
        solicitudId: solicitud.id,
        activeTab: this.activeTab, 
      },
      styleClass: 'p-app-modal',
    });

    // Recargar datos cuando se cierra el modal con éxito
    ref.onClose.subscribe((result) => {
      if (result === 'success' && this.activeTab) {
        // Forzar la recarga de los datos del tab activo
        this.forceLoadDataForTab(this.activeTab);
        // Recargar los conteos
        this.misGestionesService.getConteosUsuario().subscribe();
      }
    });
  }

  getNoItemsTitle(): string {
    switch (this.activeTab) {
      case 'solicitudes-recibidas':
        return 'No hay solicitudes recibidas';
      case 'solicitudes-enviadas':
        return 'No hay solicitudes enviadas';
      case 'prestamos-activos':
        return 'No tienes préstamos activos';
      case 'prestamos-otorgados':
        return 'No has otorgado préstamos';
      default:
        return 'No hay elementos';
    }
  }

  getNoItemsMessage(): string {
    switch (this.activeTab) {
      case 'solicitudes-recibidas':
        return 'Las solicitudes que recibas aparecerán aquí.';
      case 'solicitudes-enviadas':
        return 'Las solicitudes que envíes aparecerán aquí.';
      case 'prestamos-activos':
        return 'Los artículos que tienes prestados aparecerán aquí.';
      case 'prestamos-otorgados':
        return 'Los artículos que has prestado aparecerán aquí.';
      default:
        return 'No hay elementos disponibles.';
    }
  }
}

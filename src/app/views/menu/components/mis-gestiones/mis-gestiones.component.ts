import { Component, OnInit } from '@angular/core';
import { MisGestionesService } from './services/mis-gestiones.service';
import { Gestion } from './models/gestiones.model';

@Component({
  selector: 'app-mis-gestiones',
  templateUrl: './mis-gestiones.component.html',
  styleUrls: ['./mis-gestiones.component.scss'],
})
export class MisGestionesComponent implements OnInit {
  searchTerm: string = '';
  activeTab: 'solicitudes-recibidas' | 'solicitudes-enviadas' | 'prestamos-recibidos' | 'prestamos-enviados' | null = null;
  isOpen: boolean = false;

  opciones = [
    { label: 'Solicitudes Recibidas', value: 1 },
    { label: 'Solicitudes Enviadas', value: 2 },
    { label: 'Préstamos Recibidos', value: 3 },
    { label: 'Préstamos Enviados', value: 4 },
  ];

  constructor(
    public misGestionesService: MisGestionesService
  ) {
  }

  ngOnInit(): void {
    this.misGestionesService.getConteosUsuario().subscribe();
  }

  get solicitudesRecibidas() {
    return this.misGestionesService.solicitudesRecibidas;
  }

  get solicitudesEnviadas() { 
    return this.misGestionesService.solicitudesEnviadas;
  }

  get prestamosRecibidos() {
    return this.misGestionesService.prestamosRecibidos;
  }

  get prestamosOtorgados() {
    return this.misGestionesService.prestamosOtorgados;
  }

  get solicitudesActuales(): Gestion[] {
    switch (this.activeTab) {
      case 'solicitudes-recibidas':
        return this.solicitudesRecibidas;
      case 'solicitudes-enviadas':
        return this.solicitudesEnviadas;
      case 'prestamos-recibidos':
        return this.prestamosRecibidos;
      case 'prestamos-enviados':
        return this.prestamosOtorgados;
      default:
        return [];
    }
  }

  get solicitudesFiltradas(): Gestion[] {
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

  openFilters() {
    this.isOpen = true;
  }

  onTabChange(tab: 'solicitudes-recibidas' | 'solicitudes-enviadas' | 'prestamos-recibidos' | 'prestamos-enviados'): void {
    this.activeTab = tab;
    switch (tab) {
      case 'solicitudes-recibidas':
        this.misGestionesService.getSolicitudesRecibidas().subscribe();
        break;
      case 'solicitudes-enviadas':
        this.misGestionesService.getSolicitudesEnviadas().subscribe();
        break;
      case 'prestamos-recibidos':
        this.misGestionesService.getPrestamosRecibidos().subscribe();
        break;
      case 'prestamos-enviados':
        this.misGestionesService.getPrestamosEnviados().subscribe();
        break;
    }
  }


  getTotalSolicitudes(): number {
    return (this.solicitudesRecibidas?.length || 0) + (this.solicitudesEnviadas?.length || 0);
  }

  getTotalPrestamos(): number {
    return (this.prestamosRecibidos?.length || 0) + (this.prestamosOtorgados?.length || 0);
  }

  getTotalRecibidas(): number {
    switch (this.activeTab) {
      case 'solicitudes-recibidas':
        return this.solicitudesRecibidas?.length || 0;
      case 'prestamos-recibidos':
        return this.prestamosRecibidos?.length || 0;
      default:
        return 0;
    }
  }

  getTotalEnviadas(): number {
    return 0; // Este método ya no se usa ya que cada opción es específica
  }

  getSearchPlaceholder(): string {
    switch (this.activeTab) {
      case 'solicitudes-recibidas':
        return 'Buscar solicitudes recibidas...';
      case 'solicitudes-enviadas':
        return 'Buscar solicitudes enviadas...';
      case 'prestamos-recibidos':
        return 'Buscar préstamos recibidos...';
      case 'prestamos-enviados':
        return 'Buscar préstamos enviados...';
      default:
        return 'Buscar...';
    }
  }

  solicitudDetalle(solicitud: Gestion): void {}

  getNoItemsTitle(): string {
    switch (this.activeTab) {
      case 'solicitudes-recibidas':
        return 'No hay solicitudes recibidas';
      case 'solicitudes-enviadas':
        return 'No hay solicitudes enviadas';
      case 'prestamos-recibidos':
        return 'No hay préstamos recibidos';
      case 'prestamos-enviados':
        return 'No hay préstamos enviados';
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
      case 'prestamos-recibidos':
        return 'Los préstamos que recibas aparecerán aquí.';
      case 'prestamos-enviados':
        return 'Los préstamos que envíes aparecerán aquí.';
      default:
        return 'No hay elementos disponibles.';
    }
  }
}

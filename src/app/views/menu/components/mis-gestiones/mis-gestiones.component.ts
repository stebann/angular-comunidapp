import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FilterOption } from 'src/app/shared/models/filter-models';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { MisGestionesService } from './services/mis-gestiones.service';
import { Gestion } from './models/gestiones.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mis-gestiones',
  templateUrl: './mis-gestiones.component.html',
  styleUrls: ['./mis-gestiones.component.scss'],
})
export class MisGestionesComponent implements OnInit {
  searchTerm: string = '';
  activeTab: 'solicitudes' | 'prestamos' = 'solicitudes';
  isRecibidas: boolean = true; // true = "me hacen", false = "yo hago"
  isOpen: boolean = false;

  categorias: FilterOption[] = [];
  condiciones: FilterOption[] = [];
  tiposTransaccion: FilterOption[] = [];

  opciones = [
    { label: 'Solicitudes', value: 1 },
    { label: 'Préstamos', value: 2 },
  ];

  constructor(
    private filterService: FiltersService,
    public misGestionesService: MisGestionesService,
  ) {}

  ngOnInit(): void {
    // Suscribirse a los datos del servicio
    this.misGestionesService.getSolicitudesUsuario().subscribe();
    this.misGestionesService.getPrestamosUsuario().subscribe();

    // Cargar filtros
    this.filterService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));

    this.filterService
      .getCondiciones()
      .subscribe((condiciones) => (this.condiciones = condiciones));

    this.filterService
      .getTiposTransaccion()
      .subscribe((tipos) => (this.tiposTransaccion = tipos));
  }

  get filtro() {
    return this.misGestionesService.filtroMisGestiones;
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
    if (this.activeTab === 'solicitudes') {
      return this.isRecibidas
        ? this.solicitudesRecibidas
        : this.solicitudesEnviadas;
    } else {
      return this.isRecibidas
        ? this.prestamosRecibidos
        : this.prestamosOtorgados;
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

  onFiltersApplied(): void {
    // Demo: sin lógica adicional; ya hay filtro por búsqueda
  }

  onTabChange(tab: 'solicitudes' | 'prestamos'): void {
    this.activeTab = tab;
    // Demo: no recargar, solo cambia la vista
  }

  toggleView(): void {
    this.isRecibidas = !this.isRecibidas;
  }

  getTotalSolicitudes(): number {
    return (this.solicitudesRecibidas?.length || 0) + (this.solicitudesEnviadas?.length || 0);
  }

  getTotalPrestamos(): number {
    return (this.prestamosRecibidos?.length || 0) + (this.prestamosOtorgados?.length || 0);
  }

  getTotalRecibidas(): number {
    if (this.activeTab === 'solicitudes') {
      return this.solicitudesRecibidas?.length || 0;
    } else {
      return this.prestamosRecibidos?.length || 0;
    }
  }

  getTotalEnviadas(): number {
    if (this.activeTab === 'solicitudes') {
      return this.solicitudesEnviadas?.length || 0;
    } else {
      return this.prestamosOtorgados?.length || 0;
    }
  }

  getSearchPlaceholder(): string {
    if (this.activeTab === 'solicitudes') {
      return this.isRecibidas
        ? 'Buscar solicitudes recibidas...'
        : 'Buscar solicitudes enviadas...';
    } else {
      return this.isRecibidas
        ? 'Buscar préstamos recibidos...'
        : 'Buscar préstamos enviados...';
    }
  }

  solicitudDetalle(solicitud: Gestion): void {}

  getNoItemsTitle(): string {
    if (this.activeTab === 'solicitudes') {
      return this.isRecibidas
        ? 'No hay solicitudes recibidas'
        : 'No hay solicitudes enviadas';
    } else {
      return this.isRecibidas
        ? 'No hay préstamos recibidos'
        : 'No hay préstamos enviados';
    }
  }

  getNoItemsMessage(): string {
    if (this.activeTab === 'solicitudes') {
      return this.isRecibidas
        ? 'Las solicitudes que recibas aparecerán aquí.'
        : 'Las solicitudes que envíes aparecerán aquí.';
    } else {
      return this.isRecibidas
        ? 'Los préstamos que recibas aparecerán aquí.'
        : 'Los préstamos que envíes aparecerán aquí.';
    }
  }
}

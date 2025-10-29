import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FilterOption } from 'src/app/shared/models/filter-models';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { Gestiones } from './models/gestiones.model';
import { MisGestionesService } from './services/mis-gestiones.service';

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
  estados: FilterOption[] = [];
  tiposTransaccion: FilterOption[] = [];

  opciones = [
    { label: 'Solicitudes', value: 'solicitudes' },
    { label: 'Préstamos', value: 'prestamos' },
  ];

  constructor(
    private filterService: FiltersService,
    public misGestionesService: MisGestionesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const currentState = this.authService.currentState;
    if (currentState?.id) {
      // Cargar según el tab activo
      if (this.activeTab === 'solicitudes') {
        this.misGestionesService.getSolicitudesUsuario(currentState.id);
      } else {
        this.misGestionesService.getPrestamosUsuario(currentState.id);
      }
    }

    // Cargar filtros
    this.filterService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));

    this.filterService
      .getEstados()
      .subscribe((estados) => (this.estados = estados));

    this.filterService
      .getTiposTransaccion()
      .subscribe((tipos) => (this.tiposTransaccion = tipos));
  }

  get filtro() {
    return this.misGestionesService.filtroGestiones;
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

  get solicitudesActuales(): Gestiones[] {
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

  get solicitudesFiltradas(): Gestiones[] {
    if (!this.searchTerm.trim()) {
      return this.solicitudesActuales;
    }

    const termino = this.searchTerm.toLowerCase();
    return this.solicitudesActuales.filter(
      (solicitud) =>
        solicitud.articuloTitulo.toLowerCase().includes(termino) ||
        solicitud.mensaje.toLowerCase().includes(termino) ||
        (this.isRecibidas
          ? solicitud.usuarioSolicitante.nombre.toLowerCase().includes(termino)
          : solicitud.usuarioPropietario.nombre.toLowerCase().includes(termino))
    );
  }

  openFilters() {
    this.isOpen = true;
  }

  onFiltersApplied(): void {
    this.misGestionesService.filtrar();
  }

  onTabChange(tab: 'solicitudes' | 'prestamos'): void {
    this.activeTab = tab;
    const currentState = this.authService.currentState;
    if (currentState?.id) {
      if (tab === 'solicitudes') {
        this.misGestionesService.getSolicitudesUsuario(currentState.id);
      } else {
        this.misGestionesService.getPrestamosUsuario(currentState.id);
      }
    }
  }

  toggleView(): void {
    this.isRecibidas = !this.isRecibidas;
  }

  getTotalSolicitudes(): number {
    return this.solicitudesRecibidas.length + this.solicitudesEnviadas.length;
  }

  getTotalPrestamos(): number {
    return this.prestamosRecibidos.length + this.prestamosOtorgados.length;
  }

  getTotalRecibidas(): number {
    if (this.activeTab === 'solicitudes') {
      return this.solicitudesRecibidas.length;
    } else {
      return this.prestamosRecibidos.length;
    }
  }

  getTotalEnviadas(): number {
    if (this.activeTab === 'solicitudes') {
      return this.solicitudesEnviadas.length;
    } else {
      return this.prestamosOtorgados.length;
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

  solicitudDetalle(solicitud: Gestiones): void {}

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

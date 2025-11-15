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
  condiciones: FilterOption[] = [];
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

  // Datos "quemados" para demo
  private mockSolicitudesRecibidas: Gestiones[] = [
    {
      id: 1,
      tipo: 'solicitud',
      articuloId: 10,
      articuloTitulo: 'Taladro Percutor Bosch',
      articuloImagen: 'https://picsum.photos/seed/gest-taladro/600/400',
      articuloCategoria: 'Herramientas',
      articuloTipo: 'prestamo',
      usuarioSolicitante: {
        id: 2,
        nombre: 'Ana Gómez',
        iniciales: 'AG',
        avatar: 'https://i.pravatar.cc/64?img=47',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Tú',
        iniciales: 'TU',
        avatar: 'https://i.pravatar.cc/64?img=5',
      },
      mensaje: '¿Me lo puedes prestar este fin de semana?',
      estado: 'pendiente',
      fechaCreacion: new Date('2025-10-10'),
    },
    {
      id: 2,
      tipo: 'solicitud',
      articuloId: 11,
      articuloTitulo: 'Silla Ergonómica',
      articuloImagen: 'https://picsum.photos/seed/gest-silla/600/400',
      articuloCategoria: 'Hogar',
      articuloTipo: 'venta',
      usuarioSolicitante: {
        id: 3,
        nombre: 'Luis Pérez',
        iniciales: 'LP',
        avatar: 'https://i.pravatar.cc/64?img=12',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Tú',
        iniciales: 'TU',
        avatar: 'https://i.pravatar.cc/64?img=5',
      },
      mensaje: '¿Aún disponible? ¿Podemos negociar el precio?',
      estado: 'aceptada',
      fechaCreacion: new Date('2025-10-08'),
    },
  ];

  private mockSolicitudesEnviadas: Gestiones[] = [
    {
      id: 3,
      tipo: 'solicitud',
      articuloId: 20,
      articuloTitulo: 'Bicicleta de Montaña',
      articuloImagen: 'https://picsum.photos/seed/gest-bici/600/400',
      articuloCategoria: 'Deportes',
      articuloTipo: 'venta',
      usuarioSolicitante: {
        id: 1,
        nombre: 'Tú',
        iniciales: 'TU',
        avatar: 'https://i.pravatar.cc/64?img=5',
      },
      usuarioPropietario: {
        id: 5,
        nombre: 'Carlos Ruiz',
        iniciales: 'CR',
        avatar: 'https://i.pravatar.cc/64?img=15',
      },
      mensaje: '¿La entregas con casco y luces?',
      estado: 'rechazada',
      fechaCreacion: new Date('2025-10-01'),
    },
  ];

  private mockPrestamosRecibidos: Gestiones[] = [
    {
      id: 4,
      tipo: 'prestamo',
      articuloId: 30,
      articuloTitulo: 'Juego de Herramientas',
      articuloImagen: 'https://picsum.photos/seed/gest-herr/600/400',
      articuloCategoria: 'Herramientas',
      articuloTipo: 'prestamo',
      usuarioSolicitante: {
        id: 6,
        nombre: 'María López',
        iniciales: 'ML',
        avatar: 'https://i.pravatar.cc/64?img=32',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Tú',
        iniciales: 'TU',
        avatar: 'https://i.pravatar.cc/64?img=5',
      },
      mensaje: 'Te devuelvo el lunes sin falta.',
      estado: 'activo',
      fechaCreacion: new Date('2025-09-28'),
      fechaLimite: new Date('2025-10-15'),
    },
  ];

  private mockPrestamosOtorgados: Gestiones[] = [
    {
      id: 5,
      tipo: 'prestamo',
      articuloId: 31,
      articuloTitulo: 'Libro: Clean Code',
      articuloImagen: 'https://picsum.photos/seed/gest-libro/600/400',
      articuloCategoria: 'Libros',
      articuloTipo: 'prestamo',
      usuarioSolicitante: {
        id: 1,
        nombre: 'Tú',
        iniciales: 'TU',
        avatar: 'https://i.pravatar.cc/64?img=5',
      },
      usuarioPropietario: {
        id: 7,
        nombre: 'Jorge Díaz',
        iniciales: 'JD',
        avatar: 'https://i.pravatar.cc/64?img=68',
      },
      mensaje: 'Gracias por el préstamo, lo cuido bien.',
      estado: 'devuelto',
      fechaCreacion: new Date('2025-09-10'),
      fechaLimite: new Date('2025-09-30'),
    },
  ];

  ngOnInit() {
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
    return this.misGestionesService.filtroGestiones;
  }

  get solicitudesRecibidas() {
    return this.mockSolicitudesRecibidas;
  }

  get solicitudesEnviadas() {
    return this.mockSolicitudesEnviadas;
  }

  get prestamosRecibidos() {
    return this.mockPrestamosRecibidos;
  }

  get prestamosOtorgados() {
    return this.mockPrestamosOtorgados;
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

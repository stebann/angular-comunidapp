import { Component, OnInit } from '@angular/core';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { Gestiones } from './models/gestiones.model';
import { MisGestionesService } from './services/mis-gestiones.service';

@Component({
  selector: 'app-mis-gestiones',
  templateUrl: './mis-gestiones.component.html',
  styleUrls: ['./mis-gestiones.component.scss'],
})
export class MisGestionesComponent implements OnInit {
  constructor(
    private filterService: FiltersService,
    private misGestionesService: MisGestionesService
  ) {}

  ngOnInit() {}

  searchTerm: string = '';
  activeTab: 'solicitudes' | 'prestamos' = 'solicitudes';
  isRecibidas: boolean = true; // true = "me hacen", false = "yo hago"
  isOpen: boolean = false;

  opciones = [
    { label: 'Solicitudes', value: 'solicitudes' },
    { label: 'Préstamos', value: 'prestamos' },
  ];

  solicitudesRecibidas: Gestiones[] = [
    {
      id: 1,
      tipo: 'solicitud',
      articuloId: 1,
      articuloTitulo: 'Bicicleta de montaña Trek',
      articuloImagen:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
      articuloCategoria: 'Deportes',
      articuloTipo: 'venta',
      articuloPrecio: 450000,
      usuarioSolicitante: {
        id: 2,
        nombre: 'Ana Beltrán',
        iniciales: 'AB',
        avatar: '',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      mensaje:
        'Hola! Me interesa mucho tu bicicleta. ¿Podríamos negociar el precio? Estoy dispuesto a pagar $400,000.',

      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-15'),
      fechaActualizacion: new Date('2025-01-15'),
    },
    {
      id: 1,
      tipo: 'solicitud',
      articuloId: 1,
      articuloTitulo: 'Bicicleta de montaña Trek',
      articuloImagen:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
      articuloCategoria: 'Deportes',
      articuloTipo: 'venta',
      articuloPrecio: 450000,
      usuarioSolicitante: {
        id: 2,
        nombre: 'Ana Beltrán',
        iniciales: 'AB',
        avatar: '',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      mensaje:
        'Hola! Me interesa mucho tu bicicleta. ¿Podríamos negociar el precio? Estoy dispuesto a pagar $400,000.',

      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-15'),
      fechaActualizacion: new Date('2025-01-15'),
    },
    {
      id: 1,
      tipo: 'solicitud',
      articuloId: 1,
      articuloTitulo: 'Bicicleta de montaña Trek',
      articuloImagen:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
      articuloCategoria: 'Deportes',
      articuloTipo: 'venta',
      articuloPrecio: 450000,
      usuarioSolicitante: {
        id: 2,
        nombre: 'Ana Beltrán',
        iniciales: 'AB',
        avatar: '',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      mensaje:
        'Hola! Me interesa mucho tu bicicleta. ¿Podríamos negociar el precio? Estoy dispuesto a pagar $400,000.',

      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-15'),
      fechaActualizacion: new Date('2025-01-15'),
    },
    {
      id: 1,
      tipo: 'solicitud',
      articuloId: 1,
      articuloTitulo: 'Bicicleta de montaña Trek',
      articuloImagen:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
      articuloCategoria: 'Deportes',
      articuloTipo: 'venta',
      articuloPrecio: 450000,
      usuarioSolicitante: {
        id: 2,
        nombre: 'Ana Beltrán',
        iniciales: 'AB',
        avatar: '',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      mensaje:
        'Hola! Me interesa mucho tu bicicleta. ¿Podríamos negociar el precio? Estoy dispuesto a pagar $400,000.',

      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-15'),
      fechaActualizacion: new Date('2025-01-15'),
    },
    {
      id: 1,
      tipo: 'solicitud',
      articuloId: 1,
      articuloTitulo: 'Bicicleta de montaña Trek',
      articuloImagen:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
      articuloCategoria: 'Deportes',
      articuloTipo: 'venta',
      articuloPrecio: 450000,
      usuarioSolicitante: {
        id: 2,
        nombre: 'Ana Beltrán',
        iniciales: 'AB',
        avatar: '',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      mensaje:
        'Hola! Me interesa mucho tu bicicleta. ¿Podríamos negociar el precio? Estoy dispuesto a pagar $400,000.',

      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-15'),
      fechaActualizacion: new Date('2025-01-15'),
    },
    {
      id: 1,
      tipo: 'solicitud',
      articuloId: 1,
      articuloTitulo: 'Bicicleta de montaña Trek',
      articuloImagen:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
      articuloCategoria: 'Deportes',
      articuloTipo: 'venta',
      articuloPrecio: 450000,
      usuarioSolicitante: {
        id: 2,
        nombre: 'Ana Beltrán',
        iniciales: 'AB',
        avatar: '',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      mensaje:
        'Hola! Me interesa mucho tu bicicleta. ¿Podríamos negociar el precio? Estoy dispuesto a pagar $400,000.',

      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-15'),
      fechaActualizacion: new Date('2025-01-15'),
    },
    {
      id: 1,
      tipo: 'solicitud',
      articuloId: 1,
      articuloTitulo: 'Bicicleta de montaña Trek',
      articuloImagen:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
      articuloCategoria: 'Deportes',
      articuloTipo: 'venta',
      articuloPrecio: 450000,
      usuarioSolicitante: {
        id: 2,
        nombre: 'Ana Beltrán',
        iniciales: 'AB',
        avatar: '',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      mensaje:
        'Hola! Me interesa mucho tu bicicleta. ¿Podríamos negociar el precio? Estoy dispuesto a pagar $400,000.',

      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-15'),
      fechaActualizacion: new Date('2025-01-15'),
    },
    {
      id: 1,
      tipo: 'solicitud',
      articuloId: 1,
      articuloTitulo: 'Bicicleta de montaña Trek',
      articuloImagen:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
      articuloCategoria: 'Deportes',
      articuloTipo: 'venta',
      articuloPrecio: 450000,
      usuarioSolicitante: {
        id: 2,
        nombre: 'Ana Beltrán',
        iniciales: 'AB',
        avatar: '',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      mensaje:
        'Hola! Me interesa mucho tu bicicleta. ¿Podríamos negociar el precio? Estoy dispuesto a pagar $400,000.',

      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-15'),
      fechaActualizacion: new Date('2025-01-15'),
    },
    {
      id: 1,
      tipo: 'solicitud',
      articuloId: 1,
      articuloTitulo: 'Bicicleta de montaña Trek',
      articuloImagen:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
      articuloCategoria: 'Deportes',
      articuloTipo: 'venta',
      articuloPrecio: 450000,
      usuarioSolicitante: {
        id: 2,
        nombre: 'Ana Beltrán',
        iniciales: 'AB',
        avatar: '',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      mensaje:
        'Hola! Me interesa mucho tu bicicleta. ¿Podríamos negociar el precio? Estoy dispuesto a pagar $400,000.',

      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-15'),
      fechaActualizacion: new Date('2025-01-15'),
    },
    {
      id: 1,
      tipo: 'solicitud',
      articuloId: 1,
      articuloTitulo: 'Bicicleta de montaña Trek',
      articuloImagen:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
      articuloCategoria: 'Deportes',
      articuloTipo: 'venta',
      articuloPrecio: 450000,
      usuarioSolicitante: {
        id: 2,
        nombre: 'Ana Beltrán',
        iniciales: 'AB',
        avatar: '',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      mensaje:
        'Hola! Me interesa mucho tu bicicleta. ¿Podríamos negociar el precio? Estoy dispuesto a pagar $400,000.',

      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-15'),
      fechaActualizacion: new Date('2025-01-15'),
    },
    {
      id: 1,
      tipo: 'solicitud',
      articuloId: 1,
      articuloTitulo: 'Bicicleta de montaña Trek',
      articuloImagen:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
      articuloCategoria: 'Deportes',
      articuloTipo: 'venta',
      articuloPrecio: 450000,
      usuarioSolicitante: {
        id: 2,
        nombre: 'Ana Beltrán',
        iniciales: 'AB',
        avatar: '',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      mensaje:
        'Hola! Me interesa mucho tu bicicleta. ¿Podríamos negociar el precio? Estoy dispuesto a pagar $400,000.',

      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-15'),
      fechaActualizacion: new Date('2025-01-15'),
    },
    {
      id: 1,
      tipo: 'solicitud',
      articuloId: 1,
      articuloTitulo: 'Bicicleta de montaña Trek',
      articuloImagen:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
      articuloCategoria: 'Deportes',
      articuloTipo: 'venta',
      articuloPrecio: 450000,
      usuarioSolicitante: {
        id: 2,
        nombre: 'Ana Beltrán',
        iniciales: 'AB',
        avatar: '',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      mensaje:
        'Hola! Me interesa mucho tu bicicleta. ¿Podríamos negociar el precio? Estoy dispuesto a pagar $400,000.',

      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-15'),
      fechaActualizacion: new Date('2025-01-15'),
    },
    {
      id: 1,
      tipo: 'solicitud',
      articuloId: 1,
      articuloTitulo: 'Bicicleta de montaña Trek',
      articuloImagen:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
      articuloCategoria: 'Deportes',
      articuloTipo: 'venta',
      articuloPrecio: 450000,
      usuarioSolicitante: {
        id: 2,
        nombre: 'Ana Beltrán',
        iniciales: 'AB',
        avatar: '',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      mensaje:
        'Hola! Me interesa mucho tu bicicleta. ¿Podríamos negociar el precio? Estoy dispuesto a pagar $400,000.',

      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-15'),
      fechaActualizacion: new Date('2025-01-15'),
    },
    {
      id: 2,
      tipo: 'solicitud',
      articuloId: 2,
      articuloTitulo: 'Libro de Angular - Guía Completa',
      articuloImagen:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
      articuloCategoria: 'Libros',
      articuloTipo: 'prestamo',
      articuloPrecio: 0,
      usuarioSolicitante: {
        id: 3,
        nombre: 'Carlos Díaz',
        iniciales: 'CD',
        avatar: '',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      mensaje:
        'Hola! Soy estudiante de programación y me gustaría pedirte prestado el libro de Angular por unas semanas. Te lo devuelvo en perfecto estado.',

      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-14'),
      fechaLimite: new Date('2025-02-14'),
    },
  ];

  solicitudesEnviadas: Gestiones[] = [
    {
      id: 1,
      tipo: 'solicitud',
      articuloId: 1,
      articuloTitulo: 'Bicicleta de montaña Trek',
      articuloImagen:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
      articuloCategoria: 'Deportes',
      articuloTipo: 'venta',
      articuloPrecio: 450000,
      usuarioSolicitante: {
        id: 2,
        nombre: 'Ana Beltrán',
        iniciales: 'AB',
        avatar: '',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      mensaje:
        'Hola! Me interesa mucho tu bicicleta. ¿Podríamos negociar el precio? Estoy dispuesto a pagar $400,000.',

      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-15'),
      fechaActualizacion: new Date('2025-01-15'),
    },
    {
      id: 2,
      tipo: 'solicitud',
      articuloId: 2,
      articuloTitulo: 'Libro de Angular - Guía Completa',
      articuloImagen:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
      articuloCategoria: 'Libros',
      articuloTipo: 'prestamo',
      articuloPrecio: 0,
      usuarioSolicitante: {
        id: 3,
        nombre: 'Carlos Díaz',
        iniciales: 'CD',
        avatar: '',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      mensaje:
        'Hola! Soy estudiante de programación y me gustaría pedirte prestado el libro de Angular por unas semanas. Te lo devuelvo en perfecto estado.',

      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-14'),
      fechaLimite: new Date('2025-02-14'),
    },
    {
      id: 3,
      tipo: 'prestamo',
      articuloId: 3,
      articuloTitulo: 'Silla ergonómica de oficina',
      articuloImagen:
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
      articuloCategoria: 'Muebles',
      articuloTipo: 'prestamo',
      articuloPrecio: 0,
      usuarioSolicitante: {
        id: 4,
        nombre: 'María López',
        iniciales: 'ML',
        avatar: '',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      mensaje:
        'Tengo una mesa de escritorio que podría intercambiar por tu silla. ¿Te interesa ver fotos?',

      estado: 'aceptada',
      fechaCreacion: new Date('2025-01-10'),
      fechaActualizacion: new Date('2025-01-12'),
      articuloIntercambio: {
        id: 5,
        titulo: 'Mesa de escritorio moderna',
        imagen: '',
      },
    },
  ];

  // Arrays para préstamos (datos de ejemplo)
  prestamosRecibidos: Gestiones[] = [
    {
      id: 1,
      tipo: 'prestamo',
      articuloId: 1,
      articuloTitulo: 'Libro de Angular - Guía Completa',
      articuloImagen:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
      articuloCategoria: 'Libros',
      articuloTipo: 'prestamo',
      articuloPrecio: 0,
      usuarioSolicitante: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      usuarioPropietario: {
        id: 3,
        nombre: 'Carlos Díaz',
        iniciales: 'CD',
        avatar: '',
      },
      mensaje: 'Te presto mi libro de Angular por 2 semanas.',
      estado: 'activo',
      fechaCreacion: new Date('2025-01-10'),
      fechaLimite: new Date('2025-01-24'),
    },
  ];

  prestamosOtorgados: Gestiones[] = [
    {
      id: 1,
      tipo: 'prestamo',
      articuloId: 1,
      articuloTitulo: 'Silla ergonómica de oficina',
      articuloImagen:
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
      articuloCategoria: 'Muebles',
      articuloTipo: 'prestamo',
      articuloPrecio: 0,
      usuarioSolicitante: {
        id: 4,
        nombre: 'María López',
        iniciales: 'ML',
        avatar: '',
      },
      usuarioPropietario: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      mensaje: 'Te presto mi silla por 1 mes.',
      estado: 'activo',
      fechaCreacion: new Date('2025-01-12'),
      fechaLimite: new Date('2025-02-12'),
    },
  ];

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

  get filtro() {
    return this.misGestionesService.filtroGestiones;
  }

  openFilters() {
    this.isOpen = true;
  }

  onFiltersApplied(): void {
    this.misGestionesService.filtrar();
  }

  onTabChange(tab: 'solicitudes' | 'prestamos'): void {
    this.activeTab = tab;
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

  onSolicitudClick(solicitud: Gestiones): void {
    console.log('Solicitud clickeada:', solicitud);
    // Aquí abrirías el modal de detalle
  }

  onSolicitudAction(event: { action: string; solicitud: Gestiones }): void {
    console.log('Acción:', event.action, 'Solicitud:', event.solicitud);
    // Aquí manejarías las acciones (aceptar, rechazar, cancelar)
  }

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

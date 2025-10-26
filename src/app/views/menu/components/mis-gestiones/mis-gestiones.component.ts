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
  activeTab: 'recibidas' | 'enviadas' = 'recibidas';

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

  get solicitudesActuales(): Gestiones[] {
    return this.activeTab === 'recibidas'
      ? this.solicitudesRecibidas
      : this.solicitudesEnviadas;
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
        (this.activeTab === 'recibidas'
          ? solicitud.usuarioSolicitante.nombre.toLowerCase().includes(termino)
          : solicitud.usuarioPropietario.nombre.toLowerCase().includes(termino))
    );
  }

  openFilters() {
    this.filterService.open();
  }

  onFiltersApplied(filteredData: any): void {
    this.misGestionesService.gestiones = filteredData;
  }

  onTabChange(tab: 'recibidas' | 'enviadas'): void {
    this.activeTab = tab;
  }

  onSolicitudClick(solicitud: Gestiones): void {
    console.log('Solicitud clickeada:', solicitud);
    // Aquí abrirías el modal de detalle
  }

  onSolicitudAction(event: { action: string; solicitud: Gestiones }): void {
    console.log('Acción:', event.action, 'Solicitud:', event.solicitud);
    // Aquí manejarías las acciones (aceptar, rechazar, cancelar)
  }
}

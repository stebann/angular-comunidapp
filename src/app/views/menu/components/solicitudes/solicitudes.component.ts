import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/shared/models/solicitud.model';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { SolicitudesService } from './services/solicitudes.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
})
export class SolicitudesComponent implements OnInit {
  constructor(
    private filterService: FiltersService,
    private solicitudesService: SolicitudesService
  ) {}

  ngOnInit() {}

  searchTerm: string = '';
  activeTab: 'recibidas' | 'enviadas' = 'recibidas';

  solicitudesRecibidas: Solicitud[] = [
    {
      id: 1,
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
      tipoSolicitud: 'venta',
      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-15'),
      fechaActualizacion: new Date('2025-01-15'),
    },
    {
      id: 2,
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
      tipoSolicitud: 'prestamo',
      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-14'),
      fechaLimite: new Date('2025-02-14'),
    },
    {
      id: 3,
      articuloId: 3,
      articuloTitulo: 'Silla ergonómica de oficina',
      articuloImagen:
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
      articuloCategoria: 'Muebles',
      articuloTipo: 'intercambio',
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
      tipoSolicitud: 'intercambio',
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

  solicitudesEnviadas: Solicitud[] = [
    {
      id: 4,
      articuloId: 6,
      articuloTitulo: 'MacBook Pro 2023',
      articuloImagen:
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
      articuloCategoria: 'Tecnología',
      articuloTipo: 'venta',
      articuloPrecio: 2500000,
      usuarioSolicitante: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      usuarioPropietario: {
        id: 5,
        nombre: 'Roberto Silva',
        iniciales: 'RS',
        avatar: '',
      },
      mensaje:
        'Hola! Me interesa comprar tu MacBook. ¿Podríamos acordar un precio de $2,200,000?',
      tipoSolicitud: 'venta',
      estado: 'pendiente',
      fechaCreacion: new Date('2025-01-13'),
    },
    {
      id: 5,
      articuloId: 7,
      articuloTitulo: 'Guitarra acústica Yamaha',
      articuloImagen:
        'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop',
      articuloCategoria: 'Instrumentos',
      articuloTipo: 'prestamo',
      articuloPrecio: 0,
      usuarioSolicitante: {
        id: 1,
        nombre: 'Esteban García',
        iniciales: 'EG',
        avatar: '',
      },
      usuarioPropietario: {
        id: 6,
        nombre: 'Laura Martínez',
        iniciales: 'LM',
        avatar: '',
      },
      mensaje:
        'Hola! Soy músico y me gustaría pedirte prestada la guitarra para un evento. Te la devuelvo en una semana.',
      tipoSolicitud: 'prestamo',
      estado: 'aceptada',
      fechaCreacion: new Date('2025-01-08'),
      fechaActualizacion: new Date('2025-01-09'),
      fechaLimite: new Date('2025-01-15'),
    },
  ];

  get solicitudesActuales(): Solicitud[] {
    return this.activeTab === 'recibidas'
      ? this.solicitudesRecibidas
      : this.solicitudesEnviadas;
  }

  get solicitudesFiltradas(): Solicitud[] {
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
    this.solicitudesService.solicitudes = filteredData;
  }

  onTabChange(tab: 'recibidas' | 'enviadas'): void {
    this.activeTab = tab;
  }

  onSolicitudClick(solicitud: Solicitud): void {
    console.log('Solicitud clickeada:', solicitud);
    // Aquí abrirías el modal de detalle
  }

  onSolicitudAction(event: { action: string; solicitud: Solicitud }): void {
    console.log('Acción:', event.action, 'Solicitud:', event.solicitud);
    // Aquí manejarías las acciones (aceptar, rechazar, cancelar)
  }
}

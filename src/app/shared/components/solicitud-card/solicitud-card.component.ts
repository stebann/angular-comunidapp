import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Solicitud } from '../../models/solicitud.model';

@Component({
  selector: 'app-solicitud-card',
  templateUrl: './solicitud-card.component.html',
  styleUrls: ['./solicitud-card.component.scss'],
})
export class SolicitudCardComponent {
  @Input() solicitud!: Solicitud;
  @Input() esRecibida: boolean = true;
  @Output() cardClicked = new EventEmitter<Solicitud>();
  @Output() actionClicked = new EventEmitter<{
    action: string;
    solicitud: Solicitud;
  }>();

  constructor() {}

  onCardClick(): void {
    this.cardClicked.emit(this.solicitud);
  }

  onActionClick(action: string, event: Event): void {
    event.stopPropagation();
    this.actionClicked.emit({ action, solicitud: this.solicitud });
  }

  getEstadoClass(): string {
    switch (this.solicitud.estado) {
      case 'pendiente':
        return 'estado-pendiente';
      case 'aceptada':
        return 'estado-aceptada';
      case 'rechazada':
        return 'estado-rechazada';
      case 'cancelada':
        return 'estado-cancelada';
      default:
        return 'estado-pendiente';
    }
  }

  getEstadoLabel(): string {
    switch (this.solicitud.estado) {
      case 'pendiente':
        return 'Pendiente';
      case 'aceptada':
        return 'Aceptada';
      case 'rechazada':
        return 'Rechazada';
      case 'cancelada':
        return 'Cancelada';
      default:
        return 'Pendiente';
    }
  }

  getTipoIcon(): string {
    switch (this.solicitud.tipoSolicitud) {
      case 'venta':
        return 'pi pi-shopping-cart';
      case 'prestamo':
        return 'pi pi-clock';
      case 'intercambio':
        return 'pi pi-refresh';
      default:
        return 'pi pi-send';
    }
  }

  getTipoLabel(): string {
    switch (this.solicitud.tipoSolicitud) {
      case 'venta':
        return 'Compra';
      case 'prestamo':
        return 'Préstamo';
      case 'intercambio':
        return 'Intercambio';
      default:
        return 'Solicitud';
    }
  }

  getFechaFormateada(): string {
    const fecha = new Date(this.solicitud.fechaCreacion);
    const ahora = new Date();
    const diffMs = ahora.getTime() - fecha.getTime();
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDias === 0) {
      return 'Hoy';
    } else if (diffDias === 1) {
      return 'Ayer';
    } else if (diffDias < 7) {
      return `Hace ${diffDias} días`;
    } else {
      return fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });
    }
  }

  getImagenSrc(): string {
    if (
      this.solicitud.articuloImagen &&
      this.solicitud.articuloImagen.trim() !== ''
    ) {
      return this.solicitud.articuloImagen;
    }
    // Usar una imagen placeholder simple o mostrar un div con CSS
    return '';
  }
}

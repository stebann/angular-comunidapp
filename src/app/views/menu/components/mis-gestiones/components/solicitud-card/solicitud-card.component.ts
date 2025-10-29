import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gestiones } from 'src/app/views/menu/components/mis-gestiones/models/gestiones.model';

@Component({
  selector: 'app-solicitud-card',
  templateUrl: './solicitud-card.component.html',
  styleUrls: ['./solicitud-card.component.scss'],
})
export class SolicitudCardComponent {
  @Input() solicitud!: Gestiones;
  @Input() esRecibida: boolean = true;
  @Output() cardClicked = new EventEmitter<Gestiones>();
  @Output() actionClicked = new EventEmitter<{
    action: string;
    solicitud: Gestiones;
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
    switch (this.solicitud.tipo) {
      case 'solicitud':
        return 'pi pi-shopping-cart';
      case 'prestamo':
        return 'pi pi-book';
      default:
        return 'pi pi-book';
    }
  }

  getTipoLabel(): string {
    switch (this.solicitud.tipo) {
      case 'solicitud':
        return 'Solicitud';
      case 'prestamo':
        return 'Préstamo';
      default:
        return 'Préstamo';
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

  getTipoVistaLabel(): string {
    switch (this.solicitud.tipo) {
      case 'solicitud':
        return 'Solicitud';
      case 'prestamo':
        return 'Préstamo';
      default:
        return 'Solicitud';
    }
  }

  getImagenSrc(): string {
    if (
      this.solicitud.articuloImagen &&
      this.solicitud.articuloImagen.trim() !== ''
    ) {
      return this.solicitud.articuloImagen;
    }
    return 'https://picsum.photos/seed/solicitud/600/400';
  }

  getAvatarSrc(): string {
    const usuario = this.esRecibida
      ? this.solicitud.usuarioSolicitante
      : this.solicitud.usuarioPropietario;
    if (usuario && usuario.avatar && usuario.avatar.trim() !== '') {
      return usuario.avatar;
    }
    return '';
  }

  getUsuarioIniciales(): string {
    const usuario = this.esRecibida
      ? this.solicitud.usuarioSolicitante
      : this.solicitud.usuarioPropietario;
    return usuario?.iniciales || '';
  }
}

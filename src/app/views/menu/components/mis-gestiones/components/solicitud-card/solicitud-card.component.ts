import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gestion } from 'src/app/views/menu/components/mis-gestiones/models/gestiones.model';

@Component({
  selector: 'app-solicitud-card',
  templateUrl: './solicitud-card.component.html',
  styleUrls: ['./solicitud-card.component.scss'],
})
export class SolicitudCardComponent {
  @Input() solicitud!: Gestion;
  @Input() esRecibida: boolean = true;
  @Output() cardClicked = new EventEmitter<Gestion>();
  @Output() actionClicked = new EventEmitter<{
    action: string;
    solicitud: Gestion;
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
    const estado = this.solicitud.estadoNombre?.toLowerCase();
    if (!estado) return 'estado-pendiente';
    
    if (estado.includes('acept')) return 'estado-aceptada';
    if (estado.includes('rechaz')) return 'estado-rechazada';
    if (estado.includes('cancel')) return 'estado-cancelada';
    return 'estado-pendiente';
  }

  getEstadoLabel(): string {
    return this.solicitud.estadoNombre || 'Pendiente';
  }

  getTipoIcon(): string {
    return 'pi pi-shopping-cart';
  }

  getTipoLabel(): string {
    return 'Solicitud';
  }

  getFechaFormateada(): string {
    const fecha = new Date(this.solicitud.fechaSolicitud);
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


  getImagenSrc(): string | null {
    return this.solicitud.imagenesArticulo || null;
  }

  getAvatarSrc(): string | null {
    return this.solicitud.solicitante?.foto || null;
  }

  getUsuarioIniciales(): string {
    return (this.solicitud.solicitante?.nombre?.charAt(0) || 'U').toUpperCase();
  }
}

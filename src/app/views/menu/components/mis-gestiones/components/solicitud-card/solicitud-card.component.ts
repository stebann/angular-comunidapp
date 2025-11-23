import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageUrlService } from 'src/app/core/services/image-url.service';
import { Solicitud } from 'src/app/views/menu/components/mis-gestiones/models/solicitud.model';

@Component({
  selector: 'app-solicitud-card',
  templateUrl: './solicitud-card.component.html',
  styleUrls: ['./solicitud-card.component.scss'],
})
export class SolicitudCardComponent implements OnInit {
  @Input() solicitud: Solicitud | null = null;
  @Output() cardClicked = new EventEmitter<Solicitud>();
  @Output() actionClicked = new EventEmitter<{
    action: string;
    solicitud: Solicitud;
  }>();

  constructor(private imageUrlService: ImageUrlService) {}

  ngOnInit(): void {}

  onCardClick(): void {
    if (this.solicitud) {
      this.cardClicked.emit(this.solicitud);
    }
  }

  onActionClick(action: string, event: Event): void {
    event.stopPropagation();
    if (this.solicitud) {
      this.actionClicked.emit({ action, solicitud: this.solicitud });
    }
  }

  getEstadoClass(): string {
    if (!this.solicitud) return 'estado-pendiente';
    const estado = this.solicitud.estadoNombre?.toLowerCase();
    if (!estado) return 'estado-pendiente';

    if (estado.includes('acept')) return 'estado-aceptada';
    if (estado.includes('rechaz')) return 'estado-rechazada';
    if (estado.includes('cancel')) return 'estado-cancelada';
    if (estado.includes('devolucion')) return 'estado-devolucion-pendiente';
    return 'estado-pendiente';
  }

  getEstadoLabel(): string {
    if (!this.solicitud?.estadoNombre) return 'Pendiente';

    const estado = this.solicitud.estadoNombre.toLowerCase();

    // Textos cortos para cada estado
    if (estado.includes('devolucion')) return 'P. Devolución';
    if (estado.includes('acept')) return 'Activa';
    if (estado.includes('rechaz')) return 'Rechazada';
    if (estado.includes('cancel')) return 'Cancelada';
    if (estado.includes('devuelto')) return 'Devuelto';

    return this.solicitud.estadoNombre;
  }

  getTipoIcon(): string {
    if (!this.solicitud) return 'pi pi-file';
    // tipoCodigo: 1 = Venta, 2 = Préstamo
    return this.solicitud.tipoCodigo === 1
      ? 'pi pi-shopping-cart'
      : 'pi pi-refresh';
  }

  getTipoLabel(): string {
    if (!this.solicitud) return 'Transacción';
    // Si no hay tipoNombre, usamos el código
    if (!this.solicitud.tipoNombre) {
      return this.solicitud.tipoCodigo === 1 ? 'Venta' : 'Préstamo';
    }
    return this.solicitud.tipoNombre;
  }

  get mostrarPrecio(): boolean {
    return (
      this.solicitud?.tipoCodigo === 1 && (this.solicitud?.precio ?? 0) > 0
    );
  }

  getPrecioFormateado(): string {
    return `$${this.solicitud?.precio || 0}`;
  }

  getFechaFormateada(): string {
    if (!this.solicitud?.fechaSolicitud) return '';
    const fecha = new Date(this.solicitud.fechaSolicitud);

    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  }

  getImagenSrc(): string | null {
    if (!this.solicitud?.imagenArticulo) return null;
    return this.imageUrlService.getImagenSrc(this.solicitud.imagenArticulo);
  }

  getAvatarSrc(): string | null {
    const foto = this.solicitud?.solicitante?.foto;
    if (!foto || foto.trim() === '') {
      return null;
    }
    return foto;
  }

  getUsuarioIniciales(): string {
    const nombre = this.solicitud?.solicitante?.nombre || '';
    if (!nombre) return 'U';

    // Para nombres compuestos, tomar la primera letra del primer nombre y primer apellido
    const partes = nombre.trim().split(' ');
    if (partes.length >= 2) {
      return (
        partes[0].charAt(0) + partes[partes.length - 1].charAt(0)
      ).toUpperCase();
    }

    return nombre.charAt(0).toUpperCase();
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ArticuloCondicion,
  ArticuloEstado,
  ArticuloTipo,
} from '../../enums/articulo.enums';

@Component({
  selector: 'app-articulo-card',
  templateUrl: './articulo-card.component.html',
  styleUrls: ['./articulo-card.component.scss'],
})
export class ArticuloCardComponent {
  @Input() articulo: any;
  @Input() esDueno: boolean = false;
  selectItem: any = null;
  @Input() menuItems: any[] = [];
  @Output() cardClicked = new EventEmitter<any>();

  onCardClick() {
    this.cardClicked.emit(this.articulo);
  }

  constructor() {}

  getEstadoLabel(): string {
    const raw =
      this.articulo && this.articulo.estado
        ? this.articulo.estado
        : ArticuloEstado.Disponible;
    const e = raw.toString().toLowerCase();
    switch (e) {
      case ArticuloEstado.Prestado:
        return 'Prestado';
      case ArticuloEstado.Disponible:
      default:
        return 'Disponible';
    }
  }

  getCategoria(): string {
    return this.articulo && this.articulo.categoria
      ? this.articulo.categoria
      : '';
  }

  getTipo(): string {
    if (!this.articulo || !this.articulo.tipo) return '';
    const t = this.articulo.tipo.toString().toLowerCase();
    switch (t) {
      case ArticuloTipo.Venta:
        return 'Venta';
      case ArticuloTipo.Prestamo:
        return 'Préstamo';
      case ArticuloTipo.Intercambio:
        return 'Intercambio';
      default:
        return t.charAt(0).toUpperCase() + t.slice(1);
    }
  }

  getEstadoClass(): { [klass: string]: boolean } {
    const raw =
      this.articulo && this.articulo.estado
        ? this.articulo.estado
        : ArticuloEstado.Disponible;
    const e = raw.toString().toLowerCase();
    return {
      disponible: e === ArticuloEstado.Disponible,
      prestado: e === ArticuloEstado.Prestado,
    };
  }

  getCondicionLabel(): string {
    const raw =
      this.articulo && this.articulo.condicion
        ? this.articulo.condicion
        : ArticuloCondicion.Nuevo;
    const c = raw.toString().toLowerCase();
    switch (c) {
      case ArticuloCondicion.Usado:
        return 'Usado';
      case ArticuloCondicion.Nuevo:
      default:
        return 'Nuevo';
    }
  }

  getCondicionClass(): { [klass: string]: boolean } {
    const raw =
      this.articulo && this.articulo.condicion
        ? this.articulo.condicion
        : ArticuloCondicion.Nuevo;
    const c = raw.toString().toLowerCase();
    return {
      nuevo: c === ArticuloCondicion.Nuevo,
      usado: c === ArticuloCondicion.Usado,
    };
  }

  getImagenSrc(): string {
    if (this.articulo && this.articulo.imagen) return this.articulo.imagen;

    return (
      'https://picsum.photos/600/400?random=' +
      (Math.floor(Math.random() * 1000) + 1)
    );
  }

  getTipoDisplay(): { kind: string; icon: string; label: string } {
    const tipo =
      this.articulo && this.articulo.tipo
        ? this.articulo.tipo.toString().toLowerCase()
        : '';
    switch (tipo) {
      case ArticuloTipo.Venta: {
        const price =
          this.articulo && (this.articulo.precio || this.articulo.price)
            ? this.articulo.precio || this.articulo.price
            : null;
        if (price !== null && price !== undefined && price !== '') {
          return {
            kind: ArticuloTipo.Venta,
            icon: '',
            label: this.formatPrice(price),
          };
        }
        return { kind: ArticuloTipo.Venta, icon: '', label: 'Consultar' };
      }
      case ArticuloTipo.Prestamo:
        return { kind: ArticuloTipo.Prestamo, icon: '', label: '' };
      case ArticuloTipo.Intercambio:
        return { kind: ArticuloTipo.Intercambio, icon: '🔄', label: '' };
      default:
        return { kind: tipo || 'other', icon: '', label: '' };
    }
  }

  private formatPrice(price: any): string {
    const n = Number(price);
    if (!isNaN(n)) {
      try {
        const currency = 'COP';
        return new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(n);
      } catch {
        return String(n);
      }
    }
    return String(price);
  }

  getCondicionBadgeClass(): { [klass: string]: boolean } {
    return {
      ...this.getCondicionClass(),
      'condicion-dueno': this.esDueno,
      'condicion-no-dueno': !this.esDueno,
    };
  }
}

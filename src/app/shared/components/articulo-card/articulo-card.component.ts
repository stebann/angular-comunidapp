import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticuloCondicion } from '../../enums/articulo.enums';

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
  @Output() menuOpened = new EventEmitter<any>();

  onCardClick() {
    this.cardClicked.emit(this.articulo);
  }

  onMenuClick(): void {
    this.menuOpened.emit(this.articulo);
  }

  constructor() {}

  getEstadoLabel(): string {
    return this.articulo?.estadoNombre || 'Disponible';
  }

  getCategoria(): string {
    return this.articulo?.categoriaNombre || '';
  }

  getTipo(): string {
    return this.articulo?.tipoTransaccionNombre || '';
  }

  getEstadoClass(): { [klass: string]: boolean } {
    const estado = this.articulo?.estadoNombre?.toLowerCase() || 'disponible';
    return {
      disponible: estado === 'disponible',
      prestado: estado === 'prestado',
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
    if (this.articulo?.imagenes && this.articulo.imagenes.length > 0) {
      const imageName = this.articulo.imagenes[0];

      if (imageName.startsWith('http')) {
        return imageName;
      }

      return `http://localhost:8080/api/articulo/imagen/${imageName}`;
    }
    return (
      'https://picsum.photos/600/400?random=' +
      (Math.floor(Math.random() * 1000) + 1)
    );
  }

  getTipoDisplay(): { kind: string; icon: string; label: string } {
    const tipo = this.articulo?.tipoTransaccionNombre?.toLowerCase() || '';
    switch (tipo) {
      case 'venta': {
        const price = this.articulo?.precio;
        if (price !== null && price !== undefined && price !== '') {
          return {
            kind: 'venta',
            icon: '',
            label: this.formatPrice(price),
          };
        }
        return { kind: 'venta', icon: '', label: 'Consultar' };
      }
      case 'prestamo':
      case 'préstamo':
        return { kind: 'prestamo', icon: '', label: '' };
      case 'intercambio':
        return { kind: 'intercambio', icon: '🔄', label: '' };
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

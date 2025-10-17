import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-articulo-card',
  templateUrl: './articulo-card.component.html',
  styleUrls: ['./articulo-card.component.scss'],
})
export class ArticuloCardComponent {
  @Input() articulo: any;

  // Returns a friendly label for the estado
  getEstadoLabel(): string {
    // derive from articulo.estado; default to 'disponible'
    const raw =
      this.articulo && this.articulo.estado
        ? this.articulo.estado
        : 'disponible';
    const e = raw.toString().toLowerCase();
    if (e === 'disponible') return 'Disponible';
    if (e === 'prestado') return 'Prestado';
    return 'Disponible';
  }

  // Getter for categoria (safe)
  getCategoria(): string {
    return this.articulo && this.articulo.categoria
      ? this.articulo.categoria
      : '';
  }

  // Getter for tipo (friendly label)
  getTipo(): string {
    if (!this.articulo || !this.articulo.tipo) return '';
    const t = this.articulo.tipo.toString().toLowerCase();
    return t === 'venta'
      ? 'Venta'
      : t === 'prestamo'
      ? 'Préstamo'
      : t.charAt(0).toUpperCase() + t.slice(1);
  }

  // Returns object for ngClass so styles can be applied
  getEstadoClass(): { [klass: string]: boolean } {
    const raw =
      this.articulo && this.articulo.estado
        ? this.articulo.estado
        : 'disponible';
    const e = raw.toString().toLowerCase();
    return {
      disponible: e === 'disponible',
      prestado: e === 'prestado',
    };
  }

  // Condicion is derived from disponibilidad (estado): only 'Disponible' or 'Prestado'
  getCondicionLabel(): string {
    // derive from articulo.condicion; default to 'nuevo'
    const raw =
      this.articulo && this.articulo.condicion
        ? this.articulo.condicion
        : 'nuevo';
    const c = raw.toString().toLowerCase();
    if (c === 'nuevo') return 'Nuevo';
    if (c === 'usado') return 'Usado';
    return 'Nuevo';
  }

  getCondicionClass(): { [klass: string]: boolean } {
    const raw =
      this.articulo && this.articulo.condicion
        ? this.articulo.condicion
        : 'nuevo';
    const c = raw.toString().toLowerCase();
    return {
      nuevo: c === 'nuevo',
      usado: c === 'usado',
    };
  }

  getImagenSrc(): string {
    if (this.articulo && this.articulo.imagen) return this.articulo.imagen;

    return (
      'https://picsum.photos/600/400?random=' +
      (Math.floor(Math.random() * 1000) + 1)
    );
  }

  // Returns display info for tipo (venta/prestamo/intercambio).
  // For 'venta' will show price when available.
  getTipoDisplay(): { kind: string; icon: string; label: string } {
    const tipo =
      this.articulo && this.articulo.tipo
        ? this.articulo.tipo.toString().toLowerCase()
        : '';
    if (tipo === 'venta') {
      const price =
        this.articulo && (this.articulo.precio || this.articulo.price)
          ? this.articulo.precio || this.articulo.price
          : null;
      if (price !== null && price !== undefined && price !== '') {
        // For venta we return no icon and the formatted price as label
        return { kind: 'venta', icon: '', label: this.formatPrice(price) };
      }
      // venta but no price provided -> show 'Consultar'
      return { kind: 'venta', icon: '', label: 'Consultar' };
    }
    if (tipo === 'prestamo') return { kind: 'prestamo', icon: '', label: '' };
    if (tipo === 'intercambio')
      return { kind: 'intercambio', icon: '🔄', label: '' };
    return { kind: tipo || 'other', icon: '', label: '' };
  }

  private formatPrice(price: any): string {
    const n = Number(price);
    if (!isNaN(n)) {
      try {
        const currency = 'COP';
        return new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency,
        }).format(n);
      } catch {
        return String(n);
      }
    }
    return String(price);
  }
}

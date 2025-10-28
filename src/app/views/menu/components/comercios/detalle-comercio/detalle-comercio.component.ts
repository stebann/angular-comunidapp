import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-detalle-comercio',
  templateUrl: './detalle-comercio.component.html',
  styleUrls: ['./detalle-comercio.component.scss'],
})
export class DetalleComercioComponent {
  @Input() comercio: any = null;
  @Output() cerrar = new EventEmitter();

  searchTermArticulos: string = '';
  soloFavoritosArticulos: boolean = false;
  favoritosArticulos: number[] = [];

  get fechaActual(): string {
    return new Date().toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  get articulosFiltrados(): any[] {
    let lista = this.articulos;

    // Filtrar por búsqueda
    if (this.searchTermArticulos.trim()) {
      const termino = this.searchTermArticulos.toLowerCase();
      lista = lista.filter(
        (a) =>
          a.titulo.toLowerCase().includes(termino) ||
          a.descripcion.toLowerCase().includes(termino)
      );
    }

    // Filtrar por favoritos si está activo
    if (this.soloFavoritosArticulos) {
      lista = lista.filter((a) => this.favoritosArticulos.includes(a.id));
    }

    return lista;
  }

  get articulos(): any[] {
    if (!this.comercio) return [];

    return [
      {
        id: 1,
        titulo: 'Martillo profesional',
        descripcion: 'Martillo de acero con mango ergonómico.',
        categoria: 'Herramientas',
        tipo: 'venta',
        precio: 45000,
        estado: 'disponible',
        fechaCreacion: new Date(),
        imagen: '',
      },
      {
        id: 2,
        titulo: 'Caja de clavos',
        descripcion: 'Clavos de construcción de diferentes tamaños.',
        categoria: 'Materiales',
        tipo: 'venta',
        precio: 15000,
        estado: 'disponible',
        fechaCreacion: new Date(),
        imagen: '',
      },
      {
        id: 3,
        titulo: 'Pintura blanca',
        descripcion: 'Galón de pintura blanca premium.',
        categoria: 'Materiales',
        tipo: 'venta',
        precio: 85000,
        estado: 'disponible',
        fechaCreacion: new Date(),
        imagen: '',
      },
    ];
  }

  cerrarDetalle(): void {
    this.cerrar.emit();
  }

  toggleSoloFavoritosArticulos(): void {
    this.soloFavoritosArticulos = !this.soloFavoritosArticulos;
  }

  openFiltersArticulos(): void {
    console.log('Abrir filtros de artículos');
  }

  abrirModalInfo(): void {
    console.log('Abrir modal con info completa del negocio');
  }

  abrirModalArticulo(articulo: any): void {
    console.log('Abrir detalle de artículo:', articulo);
  }
}

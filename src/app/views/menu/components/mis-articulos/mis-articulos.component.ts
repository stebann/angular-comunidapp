import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ArticuloDetailComponent } from 'src/app/shared/components/articulo-detail/articulo-detail.component';
import { ModalArticuloComponent } from './components/modal-articulo/modal-articulo.component';
import { Articulo } from './models/articulo';
import { MisArticulosService } from './services/mis-articulos.service';

@Component({
  selector: 'app-mis-articulos',
  templateUrl: './mis-articulos.component.html',
  styleUrls: ['./mis-articulos.component.scss'],
})
export class MisArticulosComponent implements OnInit {
  searchTerm: string = '';
  menuItems: any[] = [];

  articulos: Articulo[] = [
    {
      id: 1,
      titulo: 'Bicicleta de montaña',
      descripcion:
        'Bicicleta en excelente estado, poco uso, coloca mas texto para probar el diseño  y ver como se comporta en la interfaz de usuario.',
      categoria: 'Deportes',
      tipo: 'venta',
      alt: 'Bicicleta de montaña',
      imagen: '',
      estado: 'disponible',
      precio: 450000,
      fechaCreacion: new Date('2025-10-01'),
    },
    {
      id: 2,
      titulo: 'Libro de Angular',
      descripcion:
        'Libro nuevo, edición 2024, con ejemplos prácticos y ejercicios actualizados.',
      categoria: 'Libros',
      tipo: 'prestamo',
      alt: 'Libro de Angular',
      imagen: '',
      estado: 'disponible',
      precio: 0,
      fechaCreacion: new Date('2025-09-20'),
    },
    {
      id: 3,
      titulo: 'Silla ergonómica',
      descripcion:
        'Silla cómoda para oficina, color negro, con soporte lumbar ajustable.',
      categoria: 'Muebles',
      tipo: 'venta',
      alt: 'Silla ergonómica',
      imagen: '',
      estado: 'prestado',
      precio: 120000,
      fechaCreacion: new Date('2025-08-15'),
    },
    {
      id: 2,
      titulo: 'Libro de Angular',
      descripcion:
        'Libro nuevo, edición 2024, con ejemplos prácticos y ejercicios actualizados.',
      categoria: 'Libros',
      tipo: 'prestamo',
      alt: 'Libro de Angular',
      imagen: '',
      estado: 'disponible',
      precio: 0,
      fechaCreacion: new Date('2025-09-20'),
    },
    {
      id: 3,
      titulo: 'Silla ergonómica',
      descripcion:
        'Silla cómoda para oficina, color negro, con soporte lumbar ajustable.',
      categoria: 'Muebles',
      tipo: 'venta',
      alt: 'Silla ergonómica',
      imagen: '',
      estado: 'prestado',
      precio: 120000,
      fechaCreacion: new Date('2025-08-15'),
    },
    {
      id: 2,
      titulo: 'Libro de Angular',
      descripcion:
        'Libro nuevo, edición 2024, con ejemplos prácticos y ejercicios actualizados.',
      categoria: 'Libros',
      tipo: 'prestamo',
      alt: 'Libro de Angular',
      imagen: '',
      estado: 'disponible',
      precio: 0,
      fechaCreacion: new Date('2025-09-20'),
    },
    {
      id: 3,
      titulo: 'Silla ergonómica',
      descripcion:
        'Silla cómoda para oficina, color negro, con soporte lumbar ajustable.',
      categoria: 'Muebles',
      tipo: 'venta',
      alt: 'Silla ergonómica',
      imagen: '',
      estado: 'prestado',
      precio: 120000,
      fechaCreacion: new Date('2025-08-15'),
    },
    {
      id: 2,
      titulo: 'Libro de Angular',
      descripcion:
        'Libro nuevo, edición 2024, con ejemplos prácticos y ejercicios actualizados.',
      categoria: 'Libros',
      tipo: 'prestamo',
      alt: 'Libro de Angular',
      imagen: '',
      estado: 'disponible',
      precio: 0,
      fechaCreacion: new Date('2025-09-20'),
    },
    {
      id: 3,
      titulo: 'Silla ergonómica',
      descripcion:
        'Silla cómoda para oficina, color negro, con soporte lumbar ajustable.',
      categoria: 'Muebles',
      tipo: 'venta',
      alt: 'Silla ergonómica',
      imagen: '',
      estado: 'prestado',
      precio: 120000,
      fechaCreacion: new Date('2025-08-15'),
    },
    {
      id: 2,
      titulo: 'Libro de Angular',
      descripcion:
        'Libro nuevo, edición 2024, con ejemplos prácticos y ejercicios actualizados.',
      categoria: 'Libros',
      tipo: 'prestamo',
      alt: 'Libro de Angular',
      imagen: '',
      estado: 'disponible',
      precio: 0,
      fechaCreacion: new Date('2025-09-20'),
    },
    {
      id: 3,
      titulo: 'Silla ergonómica',
      descripcion:
        'Silla cómoda para oficina, color negro, con soporte lumbar ajustable.',
      categoria: 'Muebles',
      tipo: 'venta',
      alt: 'Silla ergonómica',
      imagen: '',
      estado: 'prestado',
      precio: 120000,
      fechaCreacion: new Date('2025-08-15'),
    },
    {
      id: 2,
      titulo: 'Libro de Angular',
      descripcion:
        'Libro nuevo, edición 2024, con ejemplos prácticos y ejercicios actualizados.',
      categoria: 'Libros',
      tipo: 'prestamo',
      alt: 'Libro de Angular',
      imagen: '',
      estado: 'disponible',
      precio: 0,
      fechaCreacion: new Date('2025-09-20'),
    },
    {
      id: 3,
      titulo: 'Silla ergonómica',
      descripcion:
        'Silla cómoda para oficina, color negro, con soporte lumbar ajustable.',
      categoria: 'Muebles',
      tipo: 'venta',
      alt: 'Silla ergonómica',
      imagen: '',
      estado: 'prestado',
      precio: 120000,
      fechaCreacion: new Date('2025-08-15'),
    },
    {
      id: 2,
      titulo: 'Libro de Angular',
      descripcion:
        'Libro nuevo, edición 2024, con ejemplos prácticos y ejercicios actualizados.',
      categoria: 'Libros',
      tipo: 'prestamo',
      alt: 'Libro de Angular',
      imagen: '',
      estado: 'disponible',
      precio: 0,
      fechaCreacion: new Date('2025-09-20'),
    },
    {
      id: 3,
      titulo: 'Silla ergonómica',
      descripcion:
        'Silla cómoda para oficina, color negro, con soporte lumbar ajustable.',
      categoria: 'Muebles',
      tipo: 'venta',
      alt: 'Silla ergonómica',
      imagen: '',
      estado: 'prestado',
      precio: 120000,
      fechaCreacion: new Date('2025-08-15'),
    },
    {
      id: 2,
      titulo: 'Libro de Angular',
      descripcion:
        'Libro nuevo, edición 2024, con ejemplos prácticos y ejercicios actualizados.',
      categoria: 'Libros',
      tipo: 'prestamo',
      alt: 'Libro de Angular',
      imagen: '',
      estado: 'disponible',
      precio: 0,
      fechaCreacion: new Date('2025-09-20'),
    },
    {
      id: 3,
      titulo: 'Silla ergonómica',
      descripcion:
        'Silla cómoda para oficina, color negro, con soporte lumbar ajustable.',
      categoria: 'Muebles',
      tipo: 'venta',
      alt: 'Silla ergonómica',
      imagen: '',
      estado: 'prestado',
      precio: 120000,
      fechaCreacion: new Date('2025-08-15'),
    },
    {
      id: 2,
      titulo: 'Libro de Angular',
      descripcion:
        'Libro nuevo, edición 2024, con ejemplos prácticos y ejercicios actualizados.',
      categoria: 'Libros',
      tipo: 'prestamo',
      alt: 'Libro de Angular',
      imagen: '',
      estado: 'disponible',
      precio: 0,
      fechaCreacion: new Date('2025-09-20'),
    },
    {
      id: 3,
      titulo: 'Silla ergonómica',
      descripcion:
        'Silla cómoda para oficina, color negro, con soporte lumbar ajustable.',
      categoria: 'Muebles',
      tipo: 'venta',
      alt: 'Silla ergonómica',
      imagen: '',
      estado: 'prestado',
      precio: 120000,
      fechaCreacion: new Date('2025-08-15'),
    },
    {
      id: 2,
      titulo: 'Libro de Angular',
      descripcion:
        'Libro nuevo, edición 2024, con ejemplos prácticos y ejercicios actualizados.',
      categoria: 'Libros',
      tipo: 'prestamo',
      alt: 'Libro de Angular',
      imagen: '',
      estado: 'disponible',
      precio: 0,
      fechaCreacion: new Date('2025-09-20'),
    },
    {
      id: 3,
      titulo: 'Silla ergonómica',
      descripcion:
        'Silla cómoda para oficina, color negro, con soporte lumbar ajustable.',
      categoria: 'Muebles',
      tipo: 'venta',
      alt: 'Silla ergonómica',
      imagen: '',
      estado: 'prestado',
      precio: 120000,
      fechaCreacion: new Date('2025-08-15'),
    },
  ];

  constructor(
    private articulosService: MisArticulosService,
    public dialogService$: DialogService
  ) {}

  get form() {
    return this.articulosService.formMisArticulos;
  }

  ngOnInit(): void {
    this.loadArticulos();
    this.menuItems = [
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => {
          this.onEdit();
        },
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => {
          this.onRemove();
        },
      },
    ];
  }

  onEdit(): void {}

  onRemove(): void {}

  private loadArticulos(): void {}

  openFilters(): void {}

  openCreateModal(): void {
    this.dialogService$.open(ModalArticuloComponent, {
      header: 'Nuevo Artículo',
      styleClass: 'p-app-modal',
    });
  }

  onSearchChange(): void {}

  onFiltersApplied(filteredData: Articulo[]): void {
    this.articulosService.articulos = filteredData;
  }

  abrirModalArticulo(articulo: Articulo): void {
    this.dialogService$.open(ArticuloDetailComponent, {
      header: 'Detalle del Artículo',
      data: { articulo: articulo, esDueno: true },
      styleClass: 'p-app-modal',
    });
  }
}

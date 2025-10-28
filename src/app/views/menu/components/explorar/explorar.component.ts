import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ArticuloDetailComponent } from 'src/app/shared/components/articulo-detail/articulo-detail.component';
import { Articulo } from '../mis-articulos/models/articulo';
import { ExplorarService } from './services/explorar.service';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.scss'],
})
export class ExplorarComponent implements OnInit {
  searchTerm: string = '';

  isOpen: boolean = false;

  opciones = [
    { label: 'Solicitudes', value: 'solicitudes' },
    { label: 'Préstamos', value: 'prestamos' },
  ];
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
    private dialogService$: DialogService,
    private explorarService: ExplorarService
  ) {}

  get filtro() {
    return this.explorarService.filtroExplorar;
  }

  ngOnInit(): void {
    this.loadArticulos();
  }

  private loadArticulos(): void {}

  openFilters() {
    this.isOpen = true;
  }

  onFiltersApplied(): void {
    this.explorarService.filtrar();
  }

  abrirModalArticulo(articulo: Articulo): void {
    this.dialogService$.open(ArticuloDetailComponent, {
      header: 'Detalle del Artículo',
      data: { articulo: articulo, esDueno: true },
      styleClass: 'p-app-modal',
    });
  }
}

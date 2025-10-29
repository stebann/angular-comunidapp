import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ArticuloDetailComponent } from 'src/app/shared/components/articulo-detail/articulo-detail.component';
import { FilterOption } from 'src/app/shared/models/filter-models';
import { FiltersService } from 'src/app/shared/services/filters.service';
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
  categorias: FilterOption[] = [];
  estados: FilterOption[] = [];
  tiposTransaccion: FilterOption[] = [];

  // Lista "quemada" para demo/presentación
  private articulosMock: Articulo[] = [
    {
      id: 1,
      titulo: 'Taladro Percutor Bosch',
      descripcion: 'Taladro en excelente estado, ideal para trabajos en casa.',
      imagen: 'https://picsum.photos/seed/taladro/600/400',
      categoria: 'Herramientas',
      tipo: 'prestamo',
      alt: 'Taladro percutor',
      estado: 'Disponible',
      fechaCreacion: new Date('2025-09-15'),
    },
    {
      id: 2,
      titulo: 'Bicicleta de Montaña',
      descripcion: 'Bici MTB rin 29, poco uso, lista para salir.',
      imagen: 'https://picsum.photos/seed/bicicleta/600/400',
      categoria: 'Deportes',
      tipo: 'venta',
      alt: 'Bicicleta de montaña',
      estado: 'Usado',
      precio: 950000,
      fechaCreacion: new Date('2025-10-01'),
    },
    {
      id: 3,
      titulo: 'Silla Ergonómica',
      descripcion:
        'Silla de oficina ergonómica, muy cómoda para largas jornadas.',
      imagen: 'https://picsum.photos/seed/silla/600/400',
      categoria: 'Hogar',
      tipo: 'venta',
      alt: 'Silla ergonómica',
      estado: 'Como nuevo',
      precio: 380000,
      fechaCreacion: new Date('2025-08-20'),
    },
    {
      id: 4,
      titulo: 'Juego de Herramientas',
      descripcion:
        'Set completo de llaves y dados. Perfecto para mecánica ligera.',
      imagen: 'https://picsum.photos/seed/herramientas/600/400',
      categoria: 'Herramientas',
      tipo: 'prestamo',
      alt: 'Juego de herramientas',
      estado: 'Disponible',
      fechaCreacion: new Date('2025-07-10'),
    },
  ];

  constructor(
    public dialogService$: DialogService,
    public explorarService: ExplorarService,
    private filtersService: FiltersService
  ) {}

  ngOnInit(): void {
    // Para demo: no llamar servicio remoto; se usa lista mock

    this.filtersService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));

    this.filtersService
      .getEstados()
      .subscribe((estados) => (this.estados = estados));

    this.filtersService
      .getTiposTransaccion()
      .subscribe((tipos) => (this.tiposTransaccion = tipos));
  }

  get filtro() {
    return this.explorarService.filtroExplorar;
  }

  get articulos(): any[] {
    const term = this.searchTerm?.trim().toLowerCase();
    if (!term) {
      return this.articulosMock;
    }
    return this.articulosMock.filter(
      (a) =>
        a.titulo.toLowerCase().includes(term) ||
        a.descripcion.toLowerCase().includes(term)
    );
  }

  openFilters() {
    this.isOpen = true;
  }

  onFiltersApplied(): void {
    // Para demo: filtros avanzados deshabilitados; ya se filtra por searchTerm
  }

  abrirModalArticulo(articulo: Articulo): void {
    this.dialogService$.open(ArticuloDetailComponent, {
      header: 'Detalle del Artículo',
      data: { articulo: articulo, esDueno: true },
      styleClass: 'p-app-modal',
    });
  }
}

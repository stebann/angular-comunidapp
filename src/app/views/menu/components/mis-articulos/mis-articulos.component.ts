import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { ArticuloDetailComponent } from 'src/app/shared/components/articulo-detail/articulo-detail.component';
import { FilterOption } from 'src/app/shared/models/filter-models';

import { FiltersService } from 'src/app/shared/services/filters.service';
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
  isOpen: boolean = false;
  categorias: FilterOption[] = [];
  estados: FilterOption[] = [];
  tiposTransaccion: FilterOption[] = [];

  // Lista "quemada" para la demo de Mis Artículos
  private misArticulosMock: Articulo[] = [
    {
      id: 101,
      titulo: 'Laptop Lenovo ThinkPad',
      descripcion: 'i5, 16GB RAM, SSD 512GB. Perfecta para desarrollo.',
      imagen: 'https://picsum.photos/seed/laptop/600/400',
      categoria: 'Tecnología',
      tipo: 'venta',
      alt: 'Laptop Lenovo',
      estado: 'Como nuevo',
      precio: 2100000,
      fechaCreacion: new Date('2025-09-20'),
    },
    {
      id: 102,
      titulo: 'Taladro Black+Decker',
      descripcion: 'Incluye brocas, funciona perfecto. Ideal para arreglos.',
      imagen: 'https://picsum.photos/seed/taladro-mio/600/400',
      categoria: 'Herramientas',
      tipo: 'prestamo',
      alt: 'Taladro Black Decker',
      estado: 'Disponible',
      fechaCreacion: new Date('2025-10-05'),
    },
    {
      id: 103,
      titulo: 'Silla Gamer',
      descripcion: 'Reclinable, buen soporte lumbar. Color negro/rojo.',
      imagen: 'https://picsum.photos/seed/silla-gamer/600/400',
      categoria: 'Hogar',
      tipo: 'venta',
      alt: 'Silla gamer',
      estado: 'Usado',
      precio: 450000,
      fechaCreacion: new Date('2025-08-28'),
    },
  ];

  constructor(
    public articulosService: MisArticulosService,
    private authService: AuthService,
    private filtersService: FiltersService,
    public dialogService$: DialogService
  ) {}

  ngOnInit(): void {
    // Demo: no llamar servicio ni requerir usuario

    this.filtersService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));

    this.filtersService
      .getEstados()
      .subscribe((estados) => (this.estados = estados));

    this.filtersService
      .getTiposTransaccion()
      .subscribe((tipos) => (this.tiposTransaccion = tipos));

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

  get form() {
    return this.articulosService.formMisArticulos;
  }

  get filtro() {
    return this.articulosService.filtroMisArticulos;
  }

  get articulos(): any[] {
    const term = this.searchTerm?.trim().toLowerCase();
    const base = (
      !term
        ? this.misArticulosMock
        : this.misArticulosMock.filter(
            (a) =>
              a.titulo.toLowerCase().includes(term) ||
              a.descripcion.toLowerCase().includes(term)
          )
    ).slice();
    return base.sort((a, b) => a.titulo.localeCompare(b.titulo));
  }

  onEdit(): void {}

  onRemove(): void {}

  openFilters() {
    this.isOpen = true;
  }

  onFiltersApplied(): void {
    // Demo: filtros avanzados sin lógica; ya se filtra por searchTerm
  }

  openCreateModal(): void {
    this.dialogService$.open(ModalArticuloComponent, {
      header: 'Crear Artículo',
      width: '1200px',
      styleClass: 'p-app-modal',
    });
  }

  abrirModalArticulo(articulo: Articulo): void {
    this.dialogService$.open(ArticuloDetailComponent, {
      header: 'Detalle del Artículo',
      data: { articulo: articulo, esDueno: true },
      styleClass: 'p-app-modal',
    });
  }
}

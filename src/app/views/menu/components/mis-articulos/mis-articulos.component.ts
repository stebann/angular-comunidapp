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

  constructor(
    public articulosService: MisArticulosService,
    private authService: AuthService,
    private filtersService: FiltersService,
    public dialogService$: DialogService
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.currentState;
    if (usuario && usuario.id) {
      this.articulosService.getMisArticulos(usuario.id);
    }

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

  get articulos(): Articulo[] {
    const term = this.searchTerm?.trim().toLowerCase();
    const base = (
      !term
        ? this.articulosService.articulos
        : this.articulosService.articulos.filter(
            (a: Articulo) =>
              a.titulo.toLowerCase().includes(term) ||
              a.descripcion.toLowerCase().includes(term)
          )
    ).slice();
    return base.sort((a: Articulo, b: Articulo) =>
      a.titulo.localeCompare(b.titulo)
    );
  }

  onEdit(): void {}

  onRemove(): void {}

  openFilters() {
    this.isOpen = true;
  }

  onFiltersApplied(): void {}

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
      width: '850px',
      height: 'auto',
      data: { articulo: articulo, esDueno: true },
      styleClass: 'p-app-modal',
    });
  }
}

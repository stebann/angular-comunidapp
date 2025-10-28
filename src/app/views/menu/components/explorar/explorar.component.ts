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

  constructor(
    public dialogService$: DialogService,
    public explorarService: ExplorarService,
    private filtersService: FiltersService
  ) {}

  ngOnInit(): void {
    this.explorarService.getArticulos();

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
    return this.explorarService.articulos;
  }

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

import { Component, OnInit } from '@angular/core';
import { FilterOption } from 'src/app/shared/models/filter-models';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { ExplorarService } from '../explorar/services/explorar.service';
import { Articulo } from '../mis-articulos/models/articulo';

@Component({
  selector: 'app-admin-articulos',
  templateUrl: './admin-articulos.component.html',
  styleUrls: ['./admin-articulos.component.scss'],
})
export class AdminArticulosComponent implements OnInit {
  searchTerm: string = '';
  isOpen: boolean = false;
  categorias: FilterOption[] = [];
  estados: FilterOption[] = [];
  tiposTransaccion: FilterOption[] = [];

  constructor(
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

  get articulos(): Articulo[] {
    const term = this.searchTerm?.trim().toLowerCase();
    if (!term) {
      return this.explorarService.articulos;
    }
    return this.explorarService.articulos.filter(
      (a: Articulo) =>
        a.titulo.toLowerCase().includes(term) ||
        a.descripcion.toLowerCase().includes(term)
    );
  }

  openFilters() {
    this.isOpen = true;
  }

  onFiltersApplied(): void {
    this.explorarService.filtrar();
  }

  abrirModalArticulo(articulo: Articulo): void {}
}

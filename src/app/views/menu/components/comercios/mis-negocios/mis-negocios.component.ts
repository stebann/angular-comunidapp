import { Component } from '@angular/core';
import { FilterOption } from 'src/app/shared/models/filter-models';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { ComercioService } from '../services/comercio.service';

@Component({
  selector: 'app-mis-negocios',
  templateUrl: './mis-negocios.component.html',
  styleUrls: ['./mis-negocios.component.scss'],
})
export class MisNegociosComponent {
  searchTerm: string = '';
  soloFavoritos: boolean = false;
  favoritos: number[] = [];
  isOpen: boolean = false;

  categorias: FilterOption[] = [];
  condiciones: FilterOption[] = [];
  tiposTransaccion: FilterOption[] = [];

  constructor(
    public comercioService: ComercioService,
    private filterService: FiltersService
  ) {}

  ngOnInit(): void {
    this.filterService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));

    this.filterService
      .getCondiciones()
      .subscribe((condiciones) => (this.condiciones = condiciones));

    this.filterService
      .getTiposTransaccion()
      .subscribe((tipos) => (this.tiposTransaccion = tipos));
  }

  get filtro() {
    return this.comercioService.filtroComercio;
  }

  onFiltersApplied(): void {}

  openFilters() {
    this.isOpen = true;
  }
}

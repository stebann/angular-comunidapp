import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterOption } from 'src/app/shared/models/filter-models';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { Comercio } from '../models/comercio.model';
import { ComercioService } from '../services/comercio.service';
import { MisNegociosService } from './services/mis-negocios.service';

@Component({
  selector: 'app-mis-negocios',
  templateUrl: './mis-negocios.component.html',
  styleUrls: ['./mis-negocios.component.scss'],
})
export class MisNegociosComponent implements OnInit {
  searchTerm: string = '';
  isOpen: boolean = false;

  categorias: FilterOption[] = [];
  condiciones: FilterOption[] = [];
  tiposTransaccion: FilterOption[] = [];

  constructor(
    private router: Router,
    public comercioService: ComercioService,
    public misNegociosService: MisNegociosService,
    private filterService: FiltersService
  ) {}

  ngOnInit(): void {
    this.misNegociosService.getComerciosPorUsuario();

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

  get comercios(): Comercio[] {
    return this.misNegociosService.comercios;
  }

  get comerciosFiltrados(): Comercio[] {
    const term = this.searchTerm?.trim().toLowerCase();
    let lista = !term
      ? this.comercios
      : this.comercios.filter(
          (c) =>
            c.nombre.toLowerCase().includes(term) ||
            c.descripcion.toLowerCase().includes(term) ||
            c.direccion.toLowerCase().includes(term)
        );

    return lista.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  get filtro() {
    return this.comercioService.filtroComercio;
  }

  trackByFn(index: number, comercio: Comercio): number {
    return comercio.id;
  }

  abrirDetalleComercio(comercio: Comercio): void {
    this.router.navigate(['/app/comercios/detalle', comercio.id]);
  }

  onFiltersApplied(): void {}

  openFilters() {
    this.isOpen = true;
  }
}

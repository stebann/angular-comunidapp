import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FilterOption } from 'src/app/shared/models/filter-models';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { Comercio } from './models/comercio.model';
import { ComercioService } from './services/comercio.service';

@Component({
  selector: 'app-comercios',
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.scss'],
})
export class ComerciosComponent implements OnInit {
  searchTerm: string = '';
  soloFavoritos: boolean = false;
  favoritos: number[] = [];
  isOpen: boolean = false;

  categorias: FilterOption[] = [];
  estados: FilterOption[] = [];
  tiposTransaccion: FilterOption[] = [];

  constructor(
    private router: Router,
    public comercioService: ComercioService,
    private filterService: FiltersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.comercioService.getComercios();

    this.filterService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));

    this.filterService
      .getEstados()
      .subscribe((estados) => (this.estados = estados));

    this.filterService
      .getTiposTransaccion()
      .subscribe((tipos) => (this.tiposTransaccion = tipos));
  }

  get comercios(): Comercio[] {
    return this.comercioService.comercios;
  }

  get filtro() {
    return this.comercioService.filtroComercio;
  }

  trackByFn(index: number, comercio: Comercio): number {
    return comercio.id;
  }

  get comerciosFiltrados(): Comercio[] {
    let lista = this.comercios;

    // Filtrar por favoritos si está activo
    if (this.soloFavoritos) {
      lista = lista.filter((c) => this.favoritos.includes(c.id));
    }

    return lista;
  }

  onFiltersApplied(): void {
    this.comercioService.filtrar();
  }

  toggleFavorito(comercio: Comercio): void {
    const index = this.favoritos.indexOf(comercio.id);
    if (index > -1) {
      this.favoritos.splice(index, 1);
    } else {
      this.favoritos.push(comercio.id);
    }
  }

  esFavorito(id: number): boolean {
    return this.favoritos.includes(id);
  }

  toggleSoloFavoritos(): void {
    this.soloFavoritos = !this.soloFavoritos;
  }

  abrirDetalleComercio(comercio: Comercio): void {
    this.router.navigate(['/app/comercios/detalle', comercio.id]);
  }

  openFilters() {
    this.isOpen = true;
  }
}

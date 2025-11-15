import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { ArticuloDetailComponent } from 'src/app/shared/components/articulo-detail/articulo-detail.component';
import { Articulo } from 'src/app/shared/models/articulo.model';
import { FilterOption } from 'src/app/shared/models/filter-models';
import { FiltersService } from 'src/app/shared/services/filters.service';
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
  condiciones: FilterOption[] = [];
  tiposTransaccion: FilterOption[] = [];

  constructor(
    public dialogService$: DialogService,
    public explorarService: ExplorarService,
    private filtersService: FiltersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.explorarService.getArticulos();

    this.filtersService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));

    this.filtersService
      .getCondiciones()
      .subscribe((condiciones) => (this.condiciones = condiciones));

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

  abrirModalArticulo(articulo: Articulo): void {
    this.dialogService$.open(ArticuloDetailComponent, {
      header: 'Detalle del Artículo',
      width: '50vw',
      height: 'auto',
      data: { 
        articuloId: articulo.id,
      },
      styleClass: 'p-app-modal',
    });
  }
}

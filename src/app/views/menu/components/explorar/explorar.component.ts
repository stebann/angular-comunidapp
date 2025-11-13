import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
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
    private filtersService: FiltersService,
    private authService: AuthService
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

  abrirModalArticulo(articulo: Articulo): void {
    const usuarioActual = this.authService.currentState;
    const esDueno = articulo.usuarioId === usuarioActual?.id;
    const puedeSolicitar = !esDueno && articulo.disponible;

    this.dialogService$.open(ArticuloDetailComponent, {
      header: 'Detalle del Artículo',
      width: '850px',
      height: 'auto',
      data: {
        articulo: articulo,
        propietario: {
          id: articulo.usuarioId,
          nombre: articulo.usuarioNombre,
          email: articulo.usuarioEmail,
          telefono: articulo.usuarioTelefono,
        },
        puedeSolicitar: puedeSolicitar,
        yaSolicitado: false,
      },
      styleClass: 'p-app-modal',
    });
  }
}

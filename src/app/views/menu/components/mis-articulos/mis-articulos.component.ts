import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { DropdownOption } from '../../../../shared/components/dropdown-field/dropdown-field.component';
import { FiltersSidebarComponent } from '../../../../shared/components/filters-sidebar/filters-sidebar.component';
import { FiltersService } from '../../../../shared/services/filters.service';
import { ArticulosService, CrearArticuloDto } from './services/articulos.service';

interface Articulo {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  tipo: 'prestamo' | 'venta';
  alt: string;
  estado?: string;
  fechaCreacion?: Date;
}

@Component({
  selector: 'app-mis-articulos',
  templateUrl: './mis-articulos.component.html',
  styleUrls: ['./mis-articulos.component.scss'],
})
export class MisArticulosComponent  implements OnInit {
  private destroy$ = new Subject<void>();

  @ViewChild('filtersSidebar') filtersSidebar!: FiltersSidebarComponent;

  searchTerm: string = '';
  categoriaOptions: DropdownOption[] = [];
  estadoOptions: DropdownOption[] = [];
  tipoOptions: DropdownOption[] = [];
  openModal: boolean = false;

  constructor(
    private filtersService: FiltersService,
    private articulosService: ArticulosService,
    private authService: AuthService
  ) { }

  get form() {
    return this.articulosService.formMisArticulos;
  }

  get articulos() {
    return this.articulosService.articulos;
  }

  ngOnInit(): void {
    this.loadArticulos();
    this.loadDropdowns();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  openCreateModal(): void {
    this.openModal = true;
  }

  closeCreateModal(): void {
    this.openModal = false;
  }

  submitCreate(): void {
    const userId = this.authService.currentState.id;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.articulosService
      .crear(userId, this.form.value as CrearArticuloDto)
      .subscribe({
        next: () => {
          this.closeCreateModal();
          this.loadArticulos();
        },
      });
  }

  openFilters(): void {
    this.filtersService.open();
  }

  onSearchChange(): void {}

  onFiltersApplied(filteredData: Articulo[]): void {
    this.articulosService.articulos = filteredData;
  }

  private loadArticulos(): void {}

  private loadDropdowns(): void {
    this.filtersService.getCategorias().subscribe((cats) => {
      this.categoriaOptions = cats.map((c) => ({ value: String(c.id), label: c.nombre }));
    });
    this.filtersService.getEstados().subscribe((ests) => {
      this.estadoOptions = ests.map((e) => ({ value: String(e.id), label: e.nombre }));
    });
    this.filtersService.getTipos().subscribe((tips) => {
      this.tipoOptions = tips.map((t) => ({ value: String(t.id), label: t.nombre }));
    });
  }
}

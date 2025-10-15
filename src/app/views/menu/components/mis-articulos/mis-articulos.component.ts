import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { DropdownOption } from '../../../../shared/components/dropdown-field/dropdown-field.component';
import { FiltersSidebarComponent } from '../../../../shared/components/filters-sidebar/filters-sidebar.component';
import { FiltersService } from '../../../../shared/services/filters.service';
import { Articulo } from './models/articulo';
import { CrearArticuloDto } from './models/crear-articulo';
import { MisArticulosService } from './services/mis-articulos.service';

@Component({
  selector: 'app-mis-articulos',
  templateUrl: './mis-articulos.component.html',
  styleUrls: ['./mis-articulos.component.scss'],
})
export class MisArticulosComponent implements OnInit {
  private destroy$ = new Subject<void>();

  @ViewChild('filtersSidebar') filtersSidebar!: FiltersSidebarComponent;

  searchTerm: string = '';
  categoriaOptions: DropdownOption[] = [];
  estadoOptions: DropdownOption[] = [];
  tipoOptions: DropdownOption[] = [];
  openModal: boolean = false;

  // Lista quemada de artículos de ejemplo
  articulos: Articulo[] = [
    {
      id: 1,
      titulo: 'Bicicleta de montaña',
      descripcion: 'Bicicleta en excelente estado, poco uso.',
      categoria: 'Deportes',
      tipo: 'venta',
      alt: 'Bicicleta de montaña',
      imagen: '',
      estado: 'Nuevo',
      fechaCreacion: new Date('2025-10-01'),
    },
    {
      id: 2,
      titulo: 'Libro de Angular',
      descripcion: 'Libro nuevo, edición 2024.',
      categoria: 'Libros',
      tipo: 'prestamo',
      alt: 'Libro de Angular',
      imagen: '',
      estado: 'Nuevo',
      fechaCreacion: new Date('2025-09-20'),
    },
    {
      id: 3,
      titulo: 'Silla ergonómica',
      descripcion: 'Silla cómoda para oficina, color negro.',
      categoria: 'Muebles',
      tipo: 'venta',
      alt: 'Silla ergonómica',
      imagen: '',
      estado: 'Usado',
      fechaCreacion: new Date('2025-08-15'),
    },
  ];

  constructor(
    private filtersService: FiltersService,
    private articulosService: MisArticulosService,
    private authService: AuthService
  ) {}

  get form() {
    return this.articulosService.formMisArticulos;
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

  private loadArticulos(): void {
    // No hace nada, ya que usamos la lista quemada
  }

  private loadDropdowns(): void {
    this.filtersService.getCategorias().subscribe((cats) => {
      this.categoriaOptions = cats.map((c) => ({
        value: String(c.id),
        label: c.nombre,
      }));
    });
    this.filtersService.getEstados().subscribe((ests) => {
      this.estadoOptions = ests.map((e) => ({
        value: String(e.id),
        label: e.nombre,
      }));
    });
    this.filtersService.getTipos().subscribe((tips) => {
      this.tipoOptions = tips.map((t) => ({
        value: String(t.id),
        label: t.nombre,
      }));
    });
  }
}

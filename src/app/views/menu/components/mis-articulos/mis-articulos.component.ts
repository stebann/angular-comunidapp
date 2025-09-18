import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FiltersSidebarComponent } from '../../../../shared/components/filters-sidebar/filters-sidebar.component';
import { FiltersService } from '../../../../shared/services/filters.service';

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
export class MisArticulosComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @ViewChild('filtersSidebar') filtersSidebar!: FiltersSidebarComponent;

  articulos: Articulo[] = [];
  searchTerm: string = '';

  constructor(private filtersService: FiltersService) {}

  ngOnInit(): void {
    this.loadArticulos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addArticle(): void {}

  openFilters(): void {
    this.filtersService.open();
  }

  onSearchChange(): void {}

  onFiltersApplied(filteredData: Articulo[]): void {
    this.articulos = filteredData;
  }

  private loadArticulos(): void {}
}

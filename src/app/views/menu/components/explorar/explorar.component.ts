import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ArticuloDetailComponent } from 'src/app/shared/components/articulo-detail/articulo-detail.component';
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

  opciones = [
    { label: 'Solicitudes', value: 'solicitudes' },
    { label: 'Préstamos', value: 'prestamos' },
  ];

  constructor(
    private dialogService$: DialogService,
    private explorarService: ExplorarService
  ) {}

  ngOnInit(): void {
    this.explorarService.getArticulos();
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

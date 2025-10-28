import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FilterOption } from '../../../../../../shared/models/filter-models';
import { FiltersService } from '../../../../../../shared/services/filters.service';
import { MisArticulosService } from '../../services/mis-articulos.service';

@Component({
  selector: 'app-modal-articulo',
  templateUrl: './modal-articulo.component.html',
  styleUrls: ['./modal-articulo.component.scss'],
})
export class ModalArticuloComponent implements OnInit {
  categorias: FilterOption[] = [];
  estados: FilterOption[] = [];
  tiposTransaccion: FilterOption[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private filtersService: FiltersService,
    private articulosService: MisArticulosService
  ) {}

  ngOnInit(): void {
    this.filtersService.categorias$.subscribe({
      next: (data) => (this.categorias = data),
    });

    this.filtersService.estados$.subscribe({
      next: (data) => (this.estados = data),
    });

    this.filtersService.tipos$.subscribe({
      next: (data) => (this.tiposTransaccion = data),
    });
  }

  get form() {
    return this.articulosService.formMisArticulos;
  }

  cerrarModal() {
    this.ref.close();
  }

  guardarArticulo() {}
}

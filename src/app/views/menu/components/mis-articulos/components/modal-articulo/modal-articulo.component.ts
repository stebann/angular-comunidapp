import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('fileInput') fileInput!: ElementRef;

  categorias: FilterOption[] = [];
  estados: FilterOption[] = [];
  tiposTransaccion: FilterOption[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private filtersService: FiltersService,
    private articulosService: MisArticulosService
  ) {}

  get form() {
    return this.articulosService.formMisArticulos;
  }

  ngOnInit() {
    this.loadFilterOptions();
  }

  private loadFilterOptions() {
    this.filtersService
      .getCategorias$()
      .subscribe((categorias) => (this.categorias = categorias));

    this.filtersService
      .getEstados$()
      .subscribe((estados) => (this.estados = estados));

    this.filtersService
      .getTipos$()
      .subscribe((tipos) => (this.tiposTransaccion = tipos));
  }

  cerrarModal() {
    this.ref.close();
  }

  guardarArticulo() {}
}

import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MisArticulosService } from '../../services/mis-articulos.service';

@Component({
  selector: 'app-modal-articulo',
  templateUrl: './modal-articulo.component.html',
  styleUrls: ['./modal-articulo.component.scss'],
})
export class ModalArticuloComponent {
  constructor(
    public ref: DynamicDialogRef,
    public service: MisArticulosService
  ) {}

  get form() {
    return this.service.formMisArticulos;
  }
}

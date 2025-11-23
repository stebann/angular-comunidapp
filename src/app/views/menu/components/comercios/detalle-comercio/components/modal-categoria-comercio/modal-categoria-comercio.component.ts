import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ComercioService } from '../../../services/comercio.service';

@Component({
  selector: 'app-modal-categoria-comercio',
  templateUrl: './modal-categoria-comercio.component.html',
  styleUrls: ['./modal-categoria-comercio.component.scss'],
})
export class ModalCategoriaComercioComponent implements OnInit {
  categoriaForm: FormGroup;
  isSubmitting: boolean = false;
  comercioId: number = 0;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private comercioService: ComercioService,
    private fb: FormBuilder
  ) {
    this.comercioId = this.config.data?.comercioId || 0;
    this.categoriaForm = this.fb.group({
      nombre: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      descripcion: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  ngOnInit(): void {}

  cerrarModal(): void {
    this.ref.close();
  }

  crearCategoria(): void {
    if (this.categoriaForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      this.comercioService
        .crearCategoriaComercio(this.comercioId, this.categoriaForm.value)
        .subscribe({
          next: (response) => {
            this.ref.close({ success: true, data: response });
          },
          error: (error) => {
            console.error('Error al crear categoría:', error);
            this.isSubmitting = false;
          },
        });
    }
  }
}

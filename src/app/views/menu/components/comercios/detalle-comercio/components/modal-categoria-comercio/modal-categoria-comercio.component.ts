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
  isEditing: boolean = false;
  categoriaId: number = 0;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private comercioService: ComercioService,
    private fb: FormBuilder
  ) {
    this.comercioId = this.config.data?.comercioId || 0;
    this.isEditing = this.config.data?.isEditing || false;
    this.categoriaId = this.config.data?.categoria?.id || 0;
    
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

  ngOnInit(): void {
    if (this.isEditing && this.config.data?.categoria) {
      this.categoriaForm.patchValue({
        nombre: this.config.data.categoria.nombre,
        descripcion: this.config.data.categoria.descripcion,
      });
    }
  }

  cerrarModal(): void {
    this.ref.close();
  }

  guardarCategoria(): void {
    if (this.categoriaForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      if (this.isEditing) {
        this.comercioService
          .actualizarCategoriaComercio(this.comercioId, this.categoriaId, this.categoriaForm.value)
          .subscribe({
            next: (response) => {
              this.ref.close({ success: true, data: response });
            },
            error: (error) => {
              console.error('Error al actualizar categoría:', error);
              this.isSubmitting = false;
            },
          });
      } else {
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
}

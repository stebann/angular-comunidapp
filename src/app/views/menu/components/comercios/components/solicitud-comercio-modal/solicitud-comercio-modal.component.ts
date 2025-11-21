import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ComercioService } from '../../services/comercio.service';

@Component({
  selector: 'app-solicitud-comercio-modal',
  templateUrl: './solicitud-comercio-modal.component.html',
  styleUrls: ['./solicitud-comercio-modal.component.scss'],
})
export class SolicitudComercioModalComponent {
  solicitudForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private comercioService: ComercioService
  ) {
    this.solicitudForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      horario: [''],
    });
  }

  onCancel(): void {
    this.ref.close();
  }

  onSubmit(): void {
    if (this.solicitudForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.comercioService.crearSolicitud(this.solicitudForm.value).subscribe({
        next: () => {
          this.ref.close('success');
        },
        error: (error) => {
          console.error('Error al crear solicitud:', error);
          this.isSubmitting = false;
        },
      });
    }
  }
}

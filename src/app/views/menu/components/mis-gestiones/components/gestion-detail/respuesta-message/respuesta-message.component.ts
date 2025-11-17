import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-respuesta-message',
  templateUrl: './respuesta-message.component.html',
  styleUrls: ['./respuesta-message.component.scss'],
})
export class RespuestaMessageComponent {
  respuestaForm: FormGroup;
  isSubmitting: boolean = false;
  titulo: string = '';
  icono: string = '';

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    this.respuestaForm = this.fb.group({
      mensaje: ['', [Validators.maxLength(500)]],
    });

    // Obtener título e icono del config
    if (this.config.data) {
      this.titulo = this.config.data.titulo || '';
      this.icono = this.config.data.icono || 'pi pi-info-circle';
    }
  }

  onCancel(): void {
    this.ref.close();
  }

  onSubmit(): void {
    if (!this.isSubmitting) {
      this.isSubmitting = true;
      const formValue = this.respuestaForm.value;
      this.ref.close({
        mensajeRespuesta: formValue.mensaje || null,
      });
    }
  }
}

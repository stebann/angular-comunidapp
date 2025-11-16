import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ArticuloDetailService } from '../services/articulo-detail.service';

@Component({
  selector: 'app-solicitud-message',
  templateUrl: './solicitud-message.component.html',
  styleUrls: ['./solicitud-message.component.scss'],
})
export class SolicitudMessageComponent implements AfterViewInit {
  isSubmitting: boolean = false;
  minDate: Date = new Date();

  constructor(
    private articuloDetailService: ArticuloDetailService,
    private ref: DynamicDialogRef,
    private cdr: ChangeDetectorRef
  ) {
    // Establecer la fecha mínima como hoy
    this.minDate.setHours(0, 0, 0, 0);
  }

  ngAfterViewInit(): void {
    // Forzar detección de cambios para asegurar que el campo de fecha se renderice
    setTimeout(() => {
      this.cdr.detectChanges();
      // Forzar renderizado del campo de fecha
      const dateField = document.querySelector('app-input-date-field');
      if (dateField) {
        dateField.setAttribute(
          'style',
          'display: block !important; visibility: visible !important; opacity: 1 !important;'
        );
      }
    }, 0);
  }

  get solicitudForm() {
    return this.articuloDetailService.solicitudForm;
  }

  onCancel(): void {
    this.ref.close();
  }

  onSubmit(): void {
    if (this.solicitudForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      // Cerrar el modal y retornar los datos del formulario
      this.ref.close(this.solicitudForm.value);
    }
  }
}

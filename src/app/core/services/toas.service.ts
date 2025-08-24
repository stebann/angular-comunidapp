import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  exito(detalle: string, resumen: string = 'Éxito') {
    this.messageService.add({
      key: 'toastPrincipal',
      severity: 'success',
      summary: resumen,
      detail: detalle,
      life: 3000,
    });
  }

  error(detalle: string, resumen: string = 'Error') {
    this.messageService.add({
      key: 'toastPrincipal',
      severity: 'error',
      summary: resumen,
      detail: detalle,
      life: 3000,
    });
  }

  info(detalle: string, resumen: string = 'Información') {
    this.messageService.add({
      key: 'toastPrincipal',
      severity: 'info',
      summary: resumen,
      detail: detalle,
      life: 3000,
    });
  }

  advertencia(detalle: string, resumen: string = 'Advertencia') {
    this.messageService.add({
      key: 'toastPrincipal',
      severity: 'warn',
      summary: resumen,
      detail: detalle,
      life: 3000,
    });
  }

  limpiar() {
    this.messageService.clear('toastPrincipal');
  }
}

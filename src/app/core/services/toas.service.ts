import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AppMessagesServices {
  constructor(private messageService: MessageService) {}

  exito(detalle: string, title: string = 'Éxito') {
    this.messageService.add({
      key: 'toastPrincipal',
      severity: 'success',
      summary: title,
      detail: detalle,
      life: 3000,
      icon: 'pi pi-check-circle',
    });
  }

  error(detalle: string, title: string = 'Error') {
    this.messageService.add({
      key: 'toastPrincipal',
      severity: 'error',
      summary: title,
      detail: detalle,
      life: 3000,
      icon: 'pi pi-times-circle',
    });
  }

  info(detalle: string, title: string = 'Información') {
    this.messageService.add({
      key: 'toastPrincipal',
      severity: 'info',
      summary: title,
      detail: detalle,
      life: 3000,
      icon: 'pi pi-info-circle',
    });
  }

  advertencia(detalle: string, title: string = 'Advertencia') {
    this.messageService.add({
      key: 'toastPrincipal',
      severity: 'warn',
      summary: title,
      detail: detalle,
      life: 3000,
      icon: 'pi pi-exclamation-triangle',
    });
  }

  limpiar() {
    this.messageService.clear('toastPrincipal');
  }
}

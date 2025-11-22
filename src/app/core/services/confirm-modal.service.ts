import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject } from 'rxjs';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';

export interface ConfirmOptions {
  title?: string;
  message: string;
  acceptLabel?: string;
  cancelLabel?: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmModalService {
  private ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService) {}

  confirm(options: ConfirmOptions): Observable<boolean> {
    const subject = new Subject<boolean>();

    this.ref = this.dialogService.open(ConfirmModalComponent, {
      header: options.title || 'Confirmación',
      width: '450px',
      data: {
        message: options.message,
        acceptLabel: options.acceptLabel || 'Aceptar',
        cancelLabel: options.cancelLabel || 'Cancelar',
        icon: options.icon || 'pi pi-question-circle',
      },
      styleClass: 'p-app-modal',
    });

    this.ref.onClose.subscribe((result: boolean) => {
      subject.next(result || false);
      subject.complete();
    });

    return subject.asObservable();
  }
}

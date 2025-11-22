import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  message: string = '';
  acceptLabel: string = 'Aceptar';
  cancelLabel: string = 'Cancelar';
  icon: string = 'pi pi-question-circle';

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    if (this.config.data) {
      this.message = this.config.data.message || '';
      this.acceptLabel = this.config.data.acceptLabel || 'Aceptar';
      this.cancelLabel = this.config.data.cancelLabel || 'Cancelar';
      this.icon = this.config.data.icon || 'pi pi-question-circle';
    }
  }

  onAccept(): void {
    this.ref.close(true);
  }

  onCancel(): void {
    this.ref.close(false);
  }
}

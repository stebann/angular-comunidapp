import { Component, Inject } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Gestion } from '../../models/gestiones.model';

@Component({
  selector: 'app-gestion-detail',
  templateUrl: './gestion-detail.component.html',
  styleUrls: ['./gestion-detail.component.scss']
})
export class GestionDetailComponent {
  gestion: Gestion;
  activeTab: string;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.gestion = config.data.gestion;
    this.activeTab = config.data.activeTab;
  }

  closeModal(): void {
    this.ref.close();
  }

  onAcceptRequest(): void {
    console.log('Aceptar solicitud:', this.gestion);
    // TODO: Implementar lógica para aceptar solicitud
    this.ref.close('accept');
  }

  onRejectRequest(): void {
    console.log('Rechazar solicitud:', this.gestion);
    // TODO: Implementar lógica para rechazar solicitud
    this.ref.close('reject');
  }

  onCancelRequest(): void {
    console.log('Cancelar solicitud:', this.gestion);
    // TODO: Implementar lógica para cancelar solicitud
    this.ref.close('cancel');
  }

  onReturnItem(): void {
    console.log('Devolver artículo:', this.gestion);
    // TODO: Implementar lógica para devolver artículo
    this.ref.close('return');
  }

  onConfirmReturn(): void {
    console.log('Confirmar devolución:', this.gestion);
    // TODO: Implementar lógica para confirmar devolución
    this.ref.close('confirm');
  }

  onRemindReturn(): void {
    console.log('Recordar devolución:', this.gestion);
    // TODO: Implementar lógica para enviar recordatorio
    this.ref.close('remind');
  }
}

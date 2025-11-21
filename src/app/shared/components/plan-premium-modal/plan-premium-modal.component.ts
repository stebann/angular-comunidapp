import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { PremiumService } from 'src/app/core/services/premium.service';
import { AppMessagesServices } from 'src/app/core/services/toas.service';

@Component({
  selector: 'app-plan-premium-modal',
  templateUrl: './plan-premium-modal.component.html',
  styleUrls: ['./plan-premium-modal.component.scss'],
})
export class PlanPremiumModalComponent {
  planFeatures = [
    {
      icon: 'pi pi-store',
      title: 'Gestiona múltiples comercios',
    },
    {
      icon: 'pi pi-chart-line',
      title: 'Estadísticas avanzadas',
    },
    {
      icon: 'pi pi-star',
      title: 'Mayor visibilidad',
    },
    {
      icon: 'pi pi-shield',
      title: 'Soporte prioritario',
    },
  ];

  constructor(
    private ref: DynamicDialogRef,
    private premiumService: PremiumService,
    private authService: AuthService,
    private messageService: AppMessagesServices
  ) {}

  onCancel(): void {
    this.ref.close();
  }

  onSubscribe(): void {
    const usuarioId = this.authService.currentState.id;
    if (!usuarioId) {
      console.error('No se pudo obtener el ID del usuario');
      return;
    }

    this.premiumService.solicitarPremium(usuarioId).subscribe({
      next: () => {
        this.messageService.exito(
          'Tu solicitud de plan premium ha sido enviada exitosamente',
          'Solicitud enviada'
        );
        this.ref.close('success');
      },
      error: (error) => {
        this.ref.close();
      },
    });
  }
}

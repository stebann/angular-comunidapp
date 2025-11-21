import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PremiumService } from 'src/app/core/services/premium.service';

@Component({
  selector: 'app-plan-premium-modal',
  templateUrl: './plan-premium-modal.component.html',
  styleUrls: ['./plan-premium-modal.component.scss'],
})
export class PlanPremiumModalComponent {
  isSubmitting: boolean = false;

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
    private premiumService: PremiumService
  ) {}

  onCancel(): void {
    this.ref.close();
  }

  onSubscribe(): void {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    this.premiumService.solicitarPremium().subscribe({
      next: () => {
        this.ref.close('success');
      },
      error: (error) => {
        console.error('Error al solicitar plan premium:', error);
        this.isSubmitting = false;
      },
    });
  }
}

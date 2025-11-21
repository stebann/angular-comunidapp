import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminGestionPremiumRoutingModule } from './admin-gestion-premium-routing.module';
import { AdminGestionPremiumComponent } from './admin-gestion-premium.component';

@NgModule({
  declarations: [AdminGestionPremiumComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminGestionPremiumRoutingModule,
    SharedModule,
  ],
})
export class AdminGestionPremiumModule {}

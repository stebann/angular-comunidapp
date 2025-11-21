import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminGestionComerciosRoutingModule } from './admin-gestion-comercios-routing.module';
import { AdminGestionComerciosComponent } from './admin-gestion-comercios.component';

@NgModule({
  declarations: [AdminGestionComerciosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminGestionComerciosRoutingModule,
    SharedModule,
  ],
})
export class AdminGestionComerciosModule {}

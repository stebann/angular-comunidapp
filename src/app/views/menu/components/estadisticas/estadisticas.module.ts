import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EstadisticasRoutingModule } from './estadisticas-rounting.module';
import { EstadisticasComponent } from './estadisticas.component';

@NgModule({
  declarations: [EstadisticasComponent],
  imports: [
    CommonModule,
    SharedModule,
    EstadisticasRoutingModule,
  ],
})
export class EstadisticasModule {}

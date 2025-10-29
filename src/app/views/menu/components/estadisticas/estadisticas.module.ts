import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from 'src/app/shared/shared.module';
import { EstadisticasRoutingModule } from './estadisticas-rounting.module';
import { EstadisticasComponent } from './estadisticas.component';

@NgModule({
  declarations: [EstadisticasComponent],
  imports: [
    CommonModule,
    SharedModule,
    EstadisticasRoutingModule,
    NgxChartsModule,
  ],
})
export class EstadisticasModule {}

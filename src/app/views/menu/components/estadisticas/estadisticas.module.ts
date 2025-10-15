import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EstadisticasRoutingModule } from './estadisticas-rounting.module';
import { EstadisticasComponent } from './estadisticas.component';

@NgModule({
  declarations: [EstadisticasComponent],
  imports: [CommonModule, FormsModule, SharedModule, EstadisticasRoutingModule],
})
export class EstadisticasModule {}

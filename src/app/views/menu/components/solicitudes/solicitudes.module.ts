import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SolicitudesRoutingModule } from './solicitudes-rounting.module';
import { SolicitudesComponent } from './solicitudes.component';

@NgModule({
  declarations: [SolicitudesComponent],
  imports: [CommonModule, FormsModule, SharedModule, SolicitudesRoutingModule],
})
export class SolicitudesModule {}

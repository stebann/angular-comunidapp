import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { SolicitudCardComponent } from './components/solicitud-card/solicitud-card.component';
import { MisGestionesRoutingModule } from './mis-gestiones-rounting.module';
import { MisGestionesComponent } from './mis-gestiones.component';

@NgModule({
  declarations: [MisGestionesComponent, SolicitudCardComponent],
  imports: [CommonModule, MisGestionesRoutingModule, SharedModule],
})
export class MisGestionesModule {}

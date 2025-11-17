import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { SolicitudCardComponent } from './components/solicitud-card/solicitud-card.component';
import { GestionDetailComponent } from './components/gestion-detail/gestion-detail.component';
import { MisGestionesRoutingModule } from './mis-gestiones-rounting.module';
import { MisGestionesComponent } from './mis-gestiones.component';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [MisGestionesComponent, SolicitudCardComponent, GestionDetailComponent],
  imports: [CommonModule, MisGestionesRoutingModule, SharedModule, DialogModule, DynamicDialogModule],
})
export class MisGestionesModule {}

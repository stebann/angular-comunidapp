import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { GestionDetailComponent } from './components/gestion-detail/gestion-detail.component';
import { RespuestaMessageComponent } from './components/gestion-detail/respuesta-message/respuesta-message.component';
import { SolicitudCardComponent } from './components/solicitud-card/solicitud-card.component';
import { MisGestionesRoutingModule } from './mis-gestiones-rounting.module';
import { MisGestionesComponent } from './mis-gestiones.component';

@NgModule({
  declarations: [
    MisGestionesComponent,
    SolicitudCardComponent,
    GestionDetailComponent,
    RespuestaMessageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MisGestionesRoutingModule,
    SharedModule,
    DialogModule,
    DynamicDialogModule,
  ],
})
export class MisGestionesModule {}

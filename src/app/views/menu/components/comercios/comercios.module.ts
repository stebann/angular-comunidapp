import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComerciosRoutingModule } from './comercios-rounting.module';
import { ComerciosComponent } from './comercios.component';
import { SolicitudComercioModalComponent } from './components/solicitud-comercio-modal/solicitud-comercio-modal.component';
import { DetalleComercioComponent } from './detalle-comercio/detalle-comercio.component';
import { MisNegociosComponent } from './mis-negocios/mis-negocios.component';

@NgModule({
  declarations: [
    ComerciosComponent,
    DetalleComercioComponent,
    MisNegociosComponent,
    SolicitudComercioModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ComerciosRoutingModule,
  ],
})
export class ComerciosModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComerciosRoutingModule } from './comercios-rounting.module';
import { ComerciosComponent } from './comercios.component';
import { DetalleComercioComponent } from './detalle-comercio/detalle-comercio.component';
import { AddComercioModalComponent } from './mis-negocios/components/add-comercio-modal/add-comercio-modal.component';
import { MisNegociosComponent } from './mis-negocios/mis-negocios.component';

@NgModule({
  declarations: [
    ComerciosComponent,
    DetalleComercioComponent,
    MisNegociosComponent,
    AddComercioModalComponent,
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

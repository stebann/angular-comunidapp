import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComerciosRoutingModule } from './comercios-rounting.module';
import { ComerciosComponent } from './comercios.component';
import { ComercioCardDetalleComponent } from './components/comercio-card-detalle/comercio-card-detalle.component';
import { ComercioCardComponent } from './components/comercio-card/comercio-card.component';
import { ModalArticuloComercioComponent } from './detalle-comercio/components/modal-articulo-comercio/modal-articulo-comercio.component';
import { ModalCategoriaComercioComponent } from './detalle-comercio/components/modal-categoria-comercio/modal-categoria-comercio.component';
import { ModalInfoComercioComponent } from './detalle-comercio/components/modal-info-comercio/modal-info-comercio.component';
import { DetalleComercioComponent } from './detalle-comercio/detalle-comercio.component';
import { AddComercioModalComponent } from './mis-negocios/components/add-comercio-modal/add-comercio-modal.component';
import { MisNegociosComponent } from './mis-negocios/mis-negocios.component';

@NgModule({
  declarations: [
    ComerciosComponent,
    DetalleComercioComponent,
    MisNegociosComponent,
    AddComercioModalComponent,
    ComercioCardComponent,
    ComercioCardDetalleComponent,
    ModalArticuloComercioComponent,
    ModalCategoriaComercioComponent,
    ModalInfoComercioComponent,
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

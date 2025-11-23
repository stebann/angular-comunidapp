import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComerciosRoutingModule } from './comercios-rounting.module';
import { ComerciosComponent } from './comercios.component';
import { ComercioCardComponent } from './components/comercio-card/comercio-card.component';
import { ModalArticuloComercioComponent } from './detalle-comercio/components/modal-articulo-comercio/modal-articulo-comercio.component';
import { ModalCategoriaComercioComponent } from './detalle-comercio/components/modal-categoria-comercio/modal-categoria-comercio.component';
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
    ModalArticuloComercioComponent,
    ModalCategoriaComercioComponent,
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

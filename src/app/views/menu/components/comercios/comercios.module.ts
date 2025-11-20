import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComerciosRoutingModule } from './comercios-rounting.module';
import { ComerciosComponent } from './comercios.component';
import { DetalleComercioComponent } from './detalle-comercio/detalle-comercio.component';
import { MisNegociosComponent } from './mis-negocios/mis-negocios.component';

@NgModule({
  declarations: [
    ComerciosComponent,
    DetalleComercioComponent,
    MisNegociosComponent,
  ],
  imports: [CommonModule, FormsModule, SharedModule, ComerciosRoutingModule],
})
export class ComerciosModule {}

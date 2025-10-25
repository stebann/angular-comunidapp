import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalArticuloComponent } from './components/modal-articulo/modal-articulo.component';
import { MisArticulosRoutingModule } from './mis-articulos-rounting.module';
import { MisArticulosComponent } from './mis-articulos.component';

@NgModule({
  declarations: [MisArticulosComponent, ModalArticuloComponent],
  imports: [CommonModule, FormsModule, SharedModule, MisArticulosRoutingModule],
})
export class MisArticulosModule {}

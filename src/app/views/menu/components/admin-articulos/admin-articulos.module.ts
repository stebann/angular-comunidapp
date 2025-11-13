import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminArticulosRoutingModule } from './admin-articulos-routing.module';
import { AdminArticulosComponent } from './admin-articulos.component';

@NgModule({
  declarations: [AdminArticulosComponent],
  imports: [CommonModule, AdminArticulosRoutingModule, SharedModule],
})
export class AdminArticulosModule {}

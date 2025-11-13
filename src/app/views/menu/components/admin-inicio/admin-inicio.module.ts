import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminInicioRoutingModule } from './admin-inicio-routing.module';
import { AdminInicioComponent } from './admin-inicio.component';

@NgModule({
  declarations: [AdminInicioComponent],
  imports: [CommonModule, AdminInicioRoutingModule, SharedModule],
})
export class AdminInicioModule {}

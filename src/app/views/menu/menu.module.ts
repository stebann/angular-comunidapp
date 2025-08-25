import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventosComponent } from './components/eventos/eventos.component';

import { InicioComponent } from './components/inicio/inicio.component';
import { MenuRoutingModule } from './menu-rounting.module';

@NgModule({
  declarations: [InicioComponent, EventosComponent],
  imports: [CommonModule, SharedModule, MenuRoutingModule],
})
export class MenuModule {}

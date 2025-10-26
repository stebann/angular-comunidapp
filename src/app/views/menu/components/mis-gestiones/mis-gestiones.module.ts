import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SolicitudesSidebarComponent } from './components/solicitudes-sidebar/solicitudes-sidebar.component';
import { MisGestionesRoutingModule } from './mis-gestiones-rounting.module';
import { MisGestionesComponent } from './mis-gestiones.component';

@NgModule({
  declarations: [MisGestionesComponent, SolicitudesSidebarComponent],
  imports: [CommonModule, FormsModule, SharedModule, MisGestionesRoutingModule],
})
export class MisGestionesModule {}

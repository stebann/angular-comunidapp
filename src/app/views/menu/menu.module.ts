import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComerciosComponent } from './components/comercios/comercios.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { ExplorarComponent } from './components/explorar/explorar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MisArticulosComponent } from './components/mis-articulos/mis-articulos.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { MenuRoutingModule } from './menu-rounting.module';

@NgModule({
  declarations: [
    InicioComponent,
    ExplorarComponent,
    EstadisticasComponent,
    MisArticulosComponent,
    SolicitudesComponent,
    PrestamosComponent,
    ComerciosComponent,
  ],
  imports: [CommonModule, SharedModule, MenuRoutingModule],
})
export class MenuModule {}

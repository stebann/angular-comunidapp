import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComerciosComponent } from './components/comercios/comercios.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { ExplorarComponent } from './components/explorar/explorar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MisArticulosComponent } from './components/mis-articulos/mis-articulos.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'explorar', component: ExplorarComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'mis-articulos', component: MisArticulosComponent },
  { path: 'solicitudes', component: SolicitudesComponent },
  { path: 'prestamos', component: PrestamosComponent },
  { path: 'comercios', component: ComerciosComponent },

  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, // ruta por defecto
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LocalesComponent } from './components/locales/locales.component';
import { MisArticulosComponent } from './components/mis-articulos/mis-articulos.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'articulos', component: ArticulosComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'mis-articulos', component: MisArticulosComponent },
  { path: 'solicitudes', component: SolicitudesComponent },
  { path: 'prestamos', component: PrestamosComponent },
  { path: 'locales', component: LocalesComponent },

  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, // ruta por defecto
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}

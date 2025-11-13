import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () =>
      import('./components/inicio/inicio.module').then((m) => m.InicioModule),
  },
  {
    path: 'explorar',
    loadChildren: () =>
      import('./components/explorar/explorar.module').then(
        (m) => m.ExplorarModule
      ),
  },
  {
    path: 'estadisticas',
    loadChildren: () =>
      import('./components/estadisticas/estadisticas.module').then(
        (m) => m.EstadisticasModule
      ),
  },
  {
    path: 'mis-articulos',
    loadChildren: () =>
      import('./components/mis-articulos/mis-articulos.module').then(
        (m) => m.MisArticulosModule
      ),
  },
  {
    path: 'mis-gestiones',
    loadChildren: () =>
      import('./components/mis-gestiones/mis-gestiones.module').then(
        (m) => m.MisGestionesModule
      ),
  },
  {
    path: 'comercios',
    loadChildren: () =>
      import('./components/comercios/comercios.module').then(
        (m) => m.ComerciosModule
      ),
  },
  {
    path: 'admin-inicio',
    loadChildren: () =>
      import('./components/admin-inicio/admin-inicio.module').then(
        (m) => m.AdminInicioModule
      ),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./components/admin-inicio/admin-inicio.module').then(
        (m) => m.AdminInicioModule
      ),
  },
  {
    path: 'articulos',
    loadChildren: () =>
      import('./components/admin-articulos/admin-articulos.module').then(
        (m) => m.AdminArticulosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}

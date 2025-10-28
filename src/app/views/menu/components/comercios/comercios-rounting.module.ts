import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComerciosComponent } from './comercios.component';
import { DetalleComercioComponent } from './detalle-comercio/detalle-comercio.component';

const routes: Routes = [
  { path: '', component: ComerciosComponent },
  { path: 'detalle/:id', component: DetalleComercioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComerciosRoutingModule {}

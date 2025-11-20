import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComerciosComponent } from './comercios.component';
import { MisNegociosComponent } from './mis-negocios/mis-negocios.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'explorar',
    pathMatch: 'full',
  },
  {
    path: 'explorar',
    component: ComerciosComponent,
  },
  {
    path: 'mis-comercios',
    component: MisNegociosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComerciosRoutingModule {}

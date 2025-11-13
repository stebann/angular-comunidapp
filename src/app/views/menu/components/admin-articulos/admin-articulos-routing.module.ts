import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminArticulosComponent } from './admin-articulos.component';

const routes: Routes = [
  {
    path: '',
    component: AdminArticulosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminArticulosRoutingModule {}

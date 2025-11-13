import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminInicioComponent } from './admin-inicio.component';

const routes: Routes = [
  {
    path: '',
    component: AdminInicioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminInicioRoutingModule {}

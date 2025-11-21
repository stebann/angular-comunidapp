import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGestionComerciosComponent } from './admin-gestion-comercios.component';

const routes: Routes = [
  {
    path: '',
    component: AdminGestionComerciosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminGestionComerciosRoutingModule {}

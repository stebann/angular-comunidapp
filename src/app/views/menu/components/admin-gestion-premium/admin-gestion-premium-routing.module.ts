import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGestionPremiumComponent } from './admin-gestion-premium.component';

const routes: Routes = [
  {
    path: '',
    component: AdminGestionPremiumComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminGestionPremiumRoutingModule {}

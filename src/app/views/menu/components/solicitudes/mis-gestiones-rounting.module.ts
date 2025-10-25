import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisGestionesComponent } from './mis-gestiones.component';

const routes: Routes = [{ path: '', component: MisGestionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisGestionesRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PredictivoComponent } from './predictivo.component';

const routes: Routes = [{ path: '', component: PredictivoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PredictivoRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorarComponent } from './explorar.component';

const routes: Routes = [{ path: '', component: ExplorarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplorarRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComerciosComponent } from './comercios.component';

const routes: Routes = [{ path: '', component: ComerciosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComerciosRoutingModule {}

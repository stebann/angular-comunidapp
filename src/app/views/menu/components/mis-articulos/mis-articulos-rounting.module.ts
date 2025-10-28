import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import ModalArticuloComponent from './components/modal-articulo/modal-articulo.component';
import { MisArticulosComponent } from './mis-articulos.component';

const routes: Routes = [
  { path: '', component: MisArticulosComponent },
  { path: 'form', component: ModalArticuloComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisArticulosRoutingModule {}

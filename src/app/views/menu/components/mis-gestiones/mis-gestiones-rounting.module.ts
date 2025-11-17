import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisGestionesComponent } from './mis-gestiones.component';

const routes: Routes = [
  { 
    path: '', 
    component: MisGestionesComponent 
  },
  { 
    path: 'solicitudes-recibidas', 
    component: MisGestionesComponent 
  },
  { 
    path: 'solicitudes-enviadas', 
    component: MisGestionesComponent 
  },
  { 
    path: 'prestamos-activos', 
    component: MisGestionesComponent 
  },
  { 
    path: 'prestamos-otorgados', 
    component: MisGestionesComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisGestionesRoutingModule {}

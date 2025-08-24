import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './views/auth/notfound/notfound.component';

const routes: Routes = [
  // Ruta inicial
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () =>
      import('./views/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./views/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'layout',
    loadChildren: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

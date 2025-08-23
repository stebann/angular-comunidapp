import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NotfoundComponent } from './views/auth/notfound/notfound.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: LayoutComponent,
          loadChildren: () =>
            import('./layout/layout.component').then((m) => m.LayoutComponent),
        },
        {
          path: 'login',
          loadChildren: () =>
            import('./views/login/login.module').then((m) => m.LoginModule),
        },
        {
          path: 'register',
          loadChildren: () =>
            import('./views/register/register.module').then(
              (m) => m.RegisterModule
            ),
        },
        { path: 'notfound', component: NotfoundComponent },
        { path: '**', redirectTo: '/notfound' },
      ],
      {
        useHash: true,
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

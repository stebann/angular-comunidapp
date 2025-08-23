import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'notfound',
        loadChildren: () =>
          import('./notfound/notfound.module').then((m) => m.NotfoundModule),
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

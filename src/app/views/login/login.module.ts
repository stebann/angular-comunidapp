import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login.component';
import { LoginRoutes } from './login.routes';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutes, SharedModule],
})
export class LoginModule {}

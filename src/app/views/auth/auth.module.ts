import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, NotfoundComponent],
  imports: [CommonModule, SharedModule],
})
export class AuthModule {}

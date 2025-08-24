import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { RegisterComponent } from './register.component';
import { RegisterRoutes } from './register.routes';

@NgModule({
  imports: [CommonModule, SharedModule, RegisterRoutes],
  declarations: [RegisterComponent],
})
export class RegisterModule {}

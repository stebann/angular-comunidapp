import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminUsuariosRoutingModule } from './admin-usuarios-routing.module';
import { AdminUsuariosComponent } from './admin-usuarios.component';

@NgModule({
  declarations: [AdminUsuariosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminUsuariosRoutingModule,
    SharedModule,
  ],
})
export class AdminUsuariosModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { InicioComponent } from './inicio.component';

@NgModule({
  declarations: [InicioComponent],
  imports: [CommonModule, FormsModule, SharedModule],
})
export class InicioModule {}

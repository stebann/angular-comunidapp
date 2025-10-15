import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrestamosComponent } from './prestamos.component';

@NgModule({
  declarations: [PrestamosComponent],
  imports: [CommonModule, FormsModule, SharedModule],
})
export class PrestamosModule {}

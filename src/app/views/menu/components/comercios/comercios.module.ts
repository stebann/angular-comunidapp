import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComerciosComponent } from './comercios.component';

@NgModule({
  declarations: [ComerciosComponent],
  imports: [CommonModule, FormsModule, SharedModule],
})
export class ComerciosModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExplorarComponent } from './explorar.component';

@NgModule({
  declarations: [ExplorarComponent],
  imports: [CommonModule, FormsModule, SharedModule],
})
export class ExplorarModule {}

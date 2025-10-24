import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExplorarRoutingModule } from './explorar-rounting.module';
import { ExplorarComponent } from './explorar.component';

@NgModule({
  declarations: [ExplorarComponent],
  imports: [CommonModule, SharedModule, ExplorarRoutingModule],
})
export class ExplorarModule {}

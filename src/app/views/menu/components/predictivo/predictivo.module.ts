import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PredictivoRoutingModule } from './predictivo-routing.module';
import { PredictivoComponent } from './predictivo.component';

@NgModule({
  declarations: [PredictivoComponent],
  imports: [CommonModule, SharedModule, PredictivoRoutingModule],
})
export class PredictivoModule {}

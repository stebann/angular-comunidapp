import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventosRoutingModule } from './evento-rounting.module';
import { EventosComponent } from './eventos.component';

@NgModule({
  declarations: [EventosComponent],
  imports: [CommonModule, FormsModule, SharedModule, EventosRoutingModule],
})
export class EventosModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuRoutingModule } from './menu-rounting.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, MenuRoutingModule],
})
export class MenuModule {}

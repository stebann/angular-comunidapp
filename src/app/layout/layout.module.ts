import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MenuComponent } from './menu/menu.component';
import { TopbarComponent } from './topbar/topbar.component';

@NgModule({
  declarations: [LayoutComponent, MenuComponent, TopbarComponent],
  imports: [CommonModule, RouterModule, LayoutRoutingModule, NgxSpinnerModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { MenuRoutingModule } from './menu-rounting.module';

@NgModule({
  declarations: [HomeComponent, EventsComponent],
  imports: [CommonModule, SharedModule, MenuRoutingModule],
})
export class MenuModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { MenuComponent } from './layout/menu/menu.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { SpinnerComponent } from './layout/spinner/spinner.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MenuComponent,
    TopbarComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastModule,
    ProgressSpinnerModule,
    NgxSpinnerModule.forRoot({ type: 'ball-spin-clockwise' }),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}

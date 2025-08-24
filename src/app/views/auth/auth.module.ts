import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [NotfoundComponent],
  imports: [CommonModule, SharedModule],
})
export class AuthModule {}

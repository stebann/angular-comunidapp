import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { InputFieldComponent } from './components/input-field/input-field.component';

@NgModule({
  declarations: [InputFieldComponent, ButtonComponent, CheckboxComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    InputFieldComponent,
    ButtonComponent,
    CheckboxComponent,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SharedModule {}

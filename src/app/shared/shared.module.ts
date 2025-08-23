import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { InputFieldComponent } from './components/input-field/input-field.component';

@NgModule({
  declarations: [InputFieldComponent, ButtonComponent, CheckboxComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    InputFieldComponent,
    ButtonComponent,
    CheckboxComponent,

    CommonModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}

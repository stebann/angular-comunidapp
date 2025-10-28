import { Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-date-field',
  templateUrl: './input-date-field.component.html',
  styleUrls: ['./input-date-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateFieldComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class InputDateFieldComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() showIcon: boolean = true;

  value: Date | null = null;
  touched: boolean = false;

  onChange = (value: Date | null) => {};
  onTouched = () => {};

  writeValue(value: Date | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onDateSelect(event: Date): void {
    this.value = event;
    this.onChange(this.value);
    this.onTouched();
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}

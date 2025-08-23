import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  value: boolean = false;
  touched: boolean = false;

  onChange = (value: boolean) => {};
  onTouched = () => {};

  writeValue(value: boolean): void {
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

  onToggle(): void {
    if (!this.disabled) {
      this.value = !this.value;
      this.touched = true;
      this.onChange(this.value);
      this.onTouched();
    }
  }

  get checkboxClasses(): string {
    const baseClasses = 'form-check-input';
    const sizeClasses = {
      sm: 'form-check-input-sm',
      md: '',
      lg: 'form-check-input-lg',
    };

    return `${baseClasses} ${sizeClasses[this.size]}`.trim();
  }

  get labelClasses(): string {
    const baseClasses = 'form-check-label';
    const sizeClasses = {
      sm: 'form-check-label-sm',
      md: '',
      lg: 'form-check-label-lg',
    };

    return `${baseClasses} ${sizeClasses[this.size]}`.trim();
  }
}

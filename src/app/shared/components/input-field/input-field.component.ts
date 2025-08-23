import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' = 'text';
  @Input() icon: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() errorMessage: string = '';
  @Input() showPasswordToggle: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  value: string = '';
  showPassword: boolean = false;
  touched: boolean = false;

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
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

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  onBlur(): void {
    this.touched = true;
    this.onTouched();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  get inputType(): string {
    if (this.type === 'password' && this.showPassword) {
      return 'text';
    }
    return this.type;
  }

  get hasError(): boolean {
    return this.touched && !!this.errorMessage;
  }

  get inputClasses(): string {
    const baseClasses = 'form-control';
    const sizeClasses = {
      sm: 'form-control-sm',
      md: '',
      lg: 'form-control-lg',
    };
    const errorClass = this.hasError ? 'is-invalid' : '';

    return `${baseClasses} ${sizeClasses[this.size]} ${errorClass}`.trim();
  }
}

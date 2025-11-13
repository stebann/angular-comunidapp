import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
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
  @Input() showPasswordToggle: boolean = false;
  @Input() errorMessage: string = '';
  @Input() success: boolean = false;

  @Output() valueChange = new EventEmitter<string>();

  value: string = '';
  isDisabled: boolean = false;
  showPassword: boolean = false;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onValueChange(value: string): void {
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
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

  onBlur(): void {
    this.onTouched();
  }
}

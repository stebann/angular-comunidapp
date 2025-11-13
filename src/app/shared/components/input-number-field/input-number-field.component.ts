import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-number-field',
  templateUrl: './input-number-field.component.html',
  styleUrls: ['./input-number-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberFieldComponent),
      multi: true,
    },
  ],
})
export class InputNumberFieldComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '0';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() min: number = 0;
  @Input() max: number | undefined = undefined;
  @Input() useGrouping: boolean = true; // Usar puntos de miles
  @Input() allowDecimals: boolean = false; // Permitir decimales
  @Input() locale: string = 'es-CO';

  @Output() valueChange = new EventEmitter<number>();

  value: string = '';
  isDisabled: boolean = false;

  private onChange = (value: number | null) => {};
  private onTouched = () => {};

  writeValue(value: number | null): void {
    if (value !== null && value !== undefined) {
      this.value = this.useGrouping
        ? this.formatNumber(value)
        : value.toString();
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onValueChange(value: string): void {
    const numericValue = this.parseNumber(value);

    if (this.useGrouping && numericValue !== null) {
      this.value = this.formatNumber(numericValue);
    } else {
      this.value = value;
    }

    this.onChange(numericValue);
    this.valueChange.emit(numericValue as number);
  }

  onBlur(): void {
    if (this.value && this.useGrouping) {
      const numericValue = this.parseNumber(this.value);
      if (numericValue !== null) {
        this.value = this.formatNumber(numericValue);
      }
    }
    this.onTouched();
  }

  onKeyPress(event: KeyboardEvent): void {
    const allowedChars = this.allowDecimals ? /[0-9,]/ : /[0-9]/;
    if (!allowedChars.test(event.key)) {
      event.preventDefault();
    }
  }

  private formatNumber(value: number): string {
    const options: Intl.NumberFormatOptions = {
      minimumFractionDigits: this.allowDecimals ? 2 : 0,
      maximumFractionDigits: this.allowDecimals ? 2 : 0,
      useGrouping: this.useGrouping,
    };
    return new Intl.NumberFormat(this.locale, options).format(value);
  }

  private parseNumber(value: string): number | null {
    if (!value) return null;
    const cleaned = value.replace(/\./g, '').replace(',', '.');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? null : parsed;
  }
}

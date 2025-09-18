import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface RangeValue {
  min: number | null;
  max: number | null;
}

@Component({
  selector: 'app-range-field',
  templateUrl: './range-field.component.html',
  styleUrls: ['./range-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeFieldComponent),
      multi: true,
    },
  ],
})
export class RangeFieldComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Rango';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() label: string = '';
  @Input() errorMessage: string = '';
  @Input() minValue: number = 0;
  @Input() maxValue: number = 999999;
  @Input() step: number = 1;

  @Output() rangeChange = new EventEmitter<RangeValue>();

  value: RangeValue = { min: null, max: null };
  isDisabled: boolean = false;

  private onChange = (value: RangeValue) => {};
  private onTouched = () => {};

  writeValue(value: RangeValue): void {
    this.value = value || { min: null, max: null };
  }

  registerOnChange(fn: (value: RangeValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onMinChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const minValue = target.value ? parseFloat(target.value) : null;
    this.value = { ...this.value, min: minValue };
    this.onChange(this.value);
    this.onTouched();
    this.rangeChange.emit(this.value);
  }

  onMaxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const maxValue = target.value ? parseFloat(target.value) : null;
    this.value = { ...this.value, max: maxValue };
    this.onChange(this.value);
    this.onTouched();
    this.rangeChange.emit(this.value);
  }
}

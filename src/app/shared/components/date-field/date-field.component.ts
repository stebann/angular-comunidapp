import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateFieldComponent),
      multi: true,
    },
  ],
})
export class DateFieldComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Seleccionar fecha';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() label: string = '';
  @Input() errorMessage: string = '';
  @Input() minDate: Date | undefined = undefined;
  @Input() maxDate: Date | undefined = undefined;
  @Input() success: boolean = false;

  @Output() dateChange = new EventEmitter<Date | null>();

  value: Date | null = null;
  isDisabled: boolean = false;

  private onChange = (value: Date | null) => {};
  private onTouched = () => {};

  writeValue(value: Date | null): void {
    this.value = value || null;
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onValueChange(value: Date | null): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
    this.dateChange.emit(value);
  }

  get minDateValue(): Date | null {
    return this.minDate || null;
  }

  get maxDateValue(): Date | null {
    return this.maxDate || null;
  }
}

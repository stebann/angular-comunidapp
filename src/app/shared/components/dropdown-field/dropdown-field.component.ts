import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface DropdownOption {
  value: string | number;
  label: string;
}

@Component({
  selector: 'app-dropdown-field',
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownFieldComponent),
      multi: true,
    },
  ],
})
export class DropdownFieldComponent implements ControlValueAccessor {
  @Input() options: DropdownOption[] = [];
  @Input() placeholder: string = 'Seleccionar...';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() label: string = '';
  @Input() errorMessage: string = '';
  @Input() success: boolean = false;

  @Output() selectionChange = new EventEmitter<string | number>();

  value: string | number = '';
  isDisabled: boolean = false;

  private onChange = (value: string | number) => {};
  private onTouched = () => {};

  writeValue(value: string | number): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onSelectionChange(event: any): void {
    this.value = event.value || '';
    this.onChange(this.value);
    this.onTouched();
    this.selectionChange.emit(this.value);
  }
}

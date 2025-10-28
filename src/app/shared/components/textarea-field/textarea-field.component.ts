import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaFieldComponent),
      multi: true,
    },
  ],
})
export class TextareaFieldComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() set rows(value: number) {
    this._rows = value;
    this.updateHeight();
  }
  get rows(): number {
    return this._rows;
  }
  private _rows: number = 3;

  private updateHeight() {
    // Actualizar la altura basada en el número de filas
    if (this._rows) {
      const lineHeight = 1.5; // em
      const padding = 1.5; // rem (0.75rem * 2)
      const height = `calc((${lineHeight}em * ${this._rows}) + ${padding}rem)`;

      // Aplicar altura dinámicamente si es necesario
      setTimeout(() => {
        const textarea = document.querySelector(
          '.p-inputtextarea'
        ) as HTMLTextAreaElement;
        if (textarea) {
          textarea.style.height = height;
        }
      });
    }
  }
  @Input() maxLength: string | number | null = null;
  @Input() disabled: boolean = false;

  value: string = '';
  isDisabled: boolean = false;
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
    this.isDisabled = isDisabled;
  }

  onInput(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
    this.markAsTouched();
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}

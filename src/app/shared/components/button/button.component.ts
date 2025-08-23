import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-light'
  | 'outline-dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type: ButtonType = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() fullWidth: boolean = false;
  @Input() rounded: boolean = false;
  @Input() block: boolean = false;

  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }

  get buttonClasses(): string {
    const baseClasses = 'btn';
    const typeClass = `btn-${this.type}`;
    const sizeClass = this.size !== 'md' ? `btn-${this.size}` : '';
    const widthClass = this.fullWidth ? 'w-100' : '';
    const roundedClass = this.rounded ? 'rounded-pill' : '';
    const blockClass = this.block ? 'd-block' : '';

    return [
      baseClasses,
      typeClass,
      sizeClass,
      widthClass,
      roundedClass,
      blockClass,
    ]
      .filter(Boolean)
      .join(' ');
  }

  get iconClasses(): string {
    const baseIconClass = this.icon;
    const positionClass = this.iconPosition === 'right' ? 'ms-2' : 'me-2';
    const loadingClass = this.loading ? 'pi-spin' : '';

    return [baseIconClass, positionClass, loadingClass]
      .filter(Boolean)
      .join(' ');
  }

  get showLeftIcon(): boolean {
    return !!this.icon && this.iconPosition === 'left';
  }

  get showRightIcon(): boolean {
    return !!this.icon && this.iconPosition === 'right';
  }

  get buttonContent(): string {
    if (this.loading) {
      return 'Cargando...';
    }
    return '';
  }
}

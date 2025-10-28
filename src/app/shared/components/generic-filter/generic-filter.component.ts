import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generic-filter',
  templateUrl: './generic-filter.component.html',
  styleUrls: ['./generic-filter.component.scss'],
})
export class GenericFilterComponent {
  @Input() form!: FormGroup;
  @Input() isOpen: boolean = false;
  @Output() applyFilter = new EventEmitter<FormGroup>();
  @Output() isOpenChange = new EventEmitter<boolean>();

  applyFilters(): void {
    if (this.form.valid) {
      this.applyFilter.emit(this.form);
    }
  }

  clearFilters(): void {
    this.form.reset();
  }

  closeSidebar(): void {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }
}

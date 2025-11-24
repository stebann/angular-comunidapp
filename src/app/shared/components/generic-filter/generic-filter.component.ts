import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generic-filter',
  templateUrl: './generic-filter.component.html',
  styleUrls: ['./generic-filter.component.scss'],
})
export class GenericFilterComponent {
  @Input() isOpen: boolean = false;
  @Output() applyFilter = new EventEmitter<void>();
  @Output() clearFilter = new EventEmitter<void>();
  @Output() isOpenChange = new EventEmitter<boolean>();

  applyFilters(): void {
    this.applyFilter.emit();
  }

  clearFilters(): void {
    this.clearFilter.emit();
  }

  closeSidebar(): void {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }
}

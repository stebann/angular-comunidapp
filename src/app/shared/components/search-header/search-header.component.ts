import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
})
export class SearchHeaderComponent {
  @Input() placeholder: string = 'Buscar...';
  @Input() searchTerm: string = '';
  @Input() showSearchInput: boolean = true;
  @Output() searchTermChange = new EventEmitter<string>();

  // Permite proyectar botones de acción a la derecha
  onInput(value: string) {
    this.searchTerm = value;
    this.searchTermChange.emit(value);
  }
}

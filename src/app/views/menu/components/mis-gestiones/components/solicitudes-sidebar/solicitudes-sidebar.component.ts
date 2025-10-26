import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface SidebarOption {
  id: string;
  label: string;
  icon: string;
  count?: number;
  isActive: boolean;
}

@Component({
  selector: 'app-solicitudes-sidebar',
  templateUrl: './solicitudes-sidebar.component.html',
  styleUrls: ['./solicitudes-sidebar.component.scss'],
})
export class SolicitudesSidebarComponent {
  @Input() options: SidebarOption[] = [];
  @Output() optionClicked = new EventEmitter<SidebarOption>();

  onOptionClick(option: SidebarOption): void {
    this.optionClicked.emit(option);
  }
}

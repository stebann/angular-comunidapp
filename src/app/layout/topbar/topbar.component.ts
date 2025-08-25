import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  @Input() isUserMenuOpen = false;
  @Output() toggleSidebarClick = new EventEmitter<void>();
  @Output() toggleUserMenuClick = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();

  toggleSidebar() {
    this.toggleSidebarClick.emit();
  }

  toggleUserMenu() {
    this.toggleUserMenuClick.emit();
  }

  logout() {
    this.logoutClick.emit();
  }
}

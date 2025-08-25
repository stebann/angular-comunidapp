import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  active?: boolean;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() isCollapsed = false;
  @Input() menuItems: MenuItem[] = [];
  @Output() menuItemClick = new EventEmitter<MenuItem>();
  @Output() logoutClick = new EventEmitter<void>();

  onMenuItemClick(item: MenuItem) {
    this.menuItemClick.emit(item);
  }

  toggleItem(item: MenuItem) {
    if (item.children) {
      item.expanded = !item.expanded;
    } else {
      this.onMenuItemClick(item);
    }
  }

  logout() {
    this.logoutClick.emit();
  }
}

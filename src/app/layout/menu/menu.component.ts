import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuDTO } from '../../core/models/menu.model';

export interface MenuItem extends MenuDTO {
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
    if (item.ruta) {
      // Si tiene ruta, desactivar todos los ítems
      this.menuItems.forEach((menuItem) => {
        menuItem.active = false;
        if (menuItem.children) {
          menuItem.children.forEach((child) => (child.active = false));
        }
      });

      // Activar el ítem seleccionado
      item.active = true;
    }
    this.menuItemClick.emit(item);
  }

  logout() {
    this.logoutClick.emit();
  }

  isItemActive(item: MenuItem): boolean {
    if (item.active) return true;
    if (item.children) {
      return item.children.some((child) => child.active || false);
    }
    return false;
  }
}

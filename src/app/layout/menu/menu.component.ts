import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuItem } from '../../core/models/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() isCollapsed = false;
  @Input() set menuItems(items: MenuItem[]) {
    this._menuItems = this.processMenuItems(items);
    // Update active states after menu items are set
    setTimeout(() => this.updateActiveStates(), 0);
  }

  @Output() menuItemClick = new EventEmitter<MenuItem>();
  @Output() logoutClick = new EventEmitter<void>();

  _menuItems: MenuItem[] = [];

  constructor(private router: Router) {
    // Subscribe to route changes to update active states
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveStates();
      });
  }

  private processMenuItems(items: MenuItem[]): MenuItem[] {
    return items.map((item) => ({
      ...item,
      children: item.hijos ? this.processMenuItems(item.hijos) : undefined,
      expanded: false,
    }));
  }

  toggleSubMenu(item: MenuItem, event: Event): void {
    // Only toggle if it has children and we're not in collapsed mode
    if (item.children && item.children.length > 0 && !this.isCollapsed) {
      event.preventDefault();
      item.expanded = !item.expanded;
    }
  }

  onMenuItemClick(item: MenuItem, event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    // If it's a parent with children, just toggle the expansion
    if (item.children && item.children.length > 0) {
      if (this.isCollapsed) {
        // In collapsed mode, clicking a parent with children should navigate to its first child
        const firstChild = item.children[0];
        this.router.navigate([`/app/${firstChild.ruta}`]).then(() => {
          this.updateActiveStates();
        });
        this.menuItemClick.emit(firstChild);
      } else {
        // In expanded mode, just toggle the submenu
        item.expanded = !item.expanded;
      }
      return;
    }

    // For leaf nodes or when in collapsed mode
    if (item.ruta) {
      this.router.navigate([`/app/${item.ruta}`]).then(() => {
        this.updateActiveStates();
      });
      this.menuItemClick.emit(item);
    }
  }

  private updateActiveStates(): void {
    const currentUrl = this.router.url;
    // Normalize URL: remove leading/trailing slashes and query params
    const normalizedUrl = currentUrl
      .replace(/^\/app\//, '')
      .split('?')[0]
      .split('#')[0];

    const updateActive = (items: MenuItem[]): boolean => {
      let isActive = false;

      items.forEach((item) => {
        // Reset active state
        item.active = false;

        // Check if current URL matches this item's route
        if (item.ruta) {
          // Normalize route: remove leading/trailing slashes
          const normalizedRoute = item.ruta.replace(/^\/+|\/+$/g, '');

          // Check for exact match or if URL starts with the route (for nested routes)
          if (
            normalizedUrl === normalizedRoute ||
            normalizedUrl.startsWith(normalizedRoute + '/')
          ) {
            item.active = true;
            isActive = true;

            // Expand parent if this is a child item
            const parent = this.findParent(item);
            if (parent) {
              parent.expanded = true;
            }
          }
        }

        // Process children first to check if any child is active
        if (item.children) {
          const childActive = updateActive(item.children);
          if (childActive) {
            item.expanded = true;
            isActive = true;
          }
        }
      });

      return isActive;
    };

    updateActive(this._menuItems);
  }

  private findParent(
    item: MenuItem,
    items: MenuItem[] = this._menuItems
  ): MenuItem | null {
    for (const menuItem of items) {
      if (menuItem.children && menuItem.children.includes(item)) {
        return menuItem;
      }
      if (menuItem.children) {
        const found = this.findParent(item, menuItem.children);
        if (found) return found;
      }
    }
    return null;
  }

  logout(): void {
    this.logoutClick.emit();
  }

  isItemActive(item: MenuItem): boolean {
    if (item.active) return true;
    if (item.children) {
      return item.children.some((child) => this.isItemActive(child));
    }
    return false;
  }
}

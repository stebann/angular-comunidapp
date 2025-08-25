import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from './menu/menu.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  isSidebarCollapsed = false;
  isUserMenuOpen = false;

  menuItems: MenuItem[] = [
    { label: 'Inicio', route: '/home', icon: 'pi pi-home', active: false },
    {
      label: 'Eventos',
      route: '/events',
      icon: 'pi pi-calendar',
      active: false,
    },
  ];

  constructor(private router: Router) {
    this.updateActiveMenuItem();
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    this.router.navigate(['/auth/login']);
  }

  onMenuItemClick(item: MenuItem) {
    this.menuItems.forEach((i) => (i.active = false));
    item.active = true;
    this.router.navigate([item.route]);
  }

  private updateActiveMenuItem() {
    const currentRoute = this.router.url;
    this.menuItems.forEach((item) => {
      item.active = currentRoute.includes(item.route ?? '');
    });
  }
}

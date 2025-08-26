import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
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
    { label: 'Inicio', route: '/inicio', icon: 'pi pi-home', active: false },
    {
      label: 'Eventos',
      route: '/eventos',
      icon: 'pi pi-calendar',
      active: false,
    },
    {
      label: 'Comunidad',
      icon: 'pi pi-users',
      active: false,
      expanded: false,
      children: [
        {
          label: 'Miembros',
          route: '/comunidad/miembros',
          icon: 'pi pi-user',
          active: false,
        },
        {
          label: 'Grupos',
          route: '/comunidad/grupos',
          icon: 'pi pi-users',
          active: false,
        },
        {
          label: 'Foros',
          route: '/comunidad/foros',
          icon: 'pi pi-comments',
          active: false,
        },
        {
          label: 'Recursos',
          route: '/comunidad/recursos',
          icon: 'pi pi-file',
          active: false,
        },
      ],
    },
  ];

  constructor(private router: Router, private authService: AuthService) {
    this.updateActiveMenuItem();
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    this.authService.logout();
  }

  onMenuItemClick(item: MenuItem) {
    if (item.children) {
      // Si tiene hijos, solo expandir/contraer
      item.expanded = !item.expanded;
    } else {
      // Si no tiene hijos, navegar y marcar como activo
      this.menuItems.forEach((i) => {
        i.active = false;
        // También desactivar todos los hijos
        if (i.children) {
          i.children.forEach((child) => (child.active = false));
        }
      });
      item.active = true;
      this.router.navigate([item.route]);
    }
  }

  private updateActiveMenuItem() {
    const currentRoute = this.router.url;
    this.menuItems.forEach((item) => {
      if (item.children) {
        // Para elementos con hijos, verificar si algún hijo está activo
        item.children.forEach((child) => {
          child.active = currentRoute.includes(child.route ?? '');
        });
        // Si algún hijo está activo, expandir el padre
        item.expanded = item.children.some((child) => child.active);
      } else {
        item.active = currentRoute.includes(item.route ?? '');
      }
    });
  }
}

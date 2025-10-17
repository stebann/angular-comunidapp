import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
    { label: 'Inicio', route: 'inicio', icon: 'pi pi-home', active: false },
    {
      label: 'Explorar',
      route: 'explorar',
      icon: 'pi pi-compass',
      active: false,
    },
    {
      label: 'Mis Artículos',
      route: 'mis-articulos',
      icon: 'pi pi-box',
      active: false,
    },
    {
      label: 'Solicitudes',
      route: 'solicitudes',
      icon: 'pi pi-envelope',
      active: false,
    },
    {
      label: 'Préstamos',
      route: 'prestamos',
      icon: 'pi pi-send',
      active: false,
    },
    {
      label: 'Comercios',
      route: 'comercios',
      icon: 'pi pi-building',
      active: false,
    },
    {
      label: 'Estadísticas',
      route: 'estadisticas',
      icon: 'pi pi-chart-bar',
      active: false,
    },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    // Inicialmente marcar el item activo según la ruta actual
    this.updateActiveMenuItem();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveMenuItem();
      }
    });
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
      // Navegar a la ruta absoluta bajo /app para evitar problemas desde rutas hijas
      const url = `/app/${item.route}`;
      this.router.navigateByUrl(url);
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

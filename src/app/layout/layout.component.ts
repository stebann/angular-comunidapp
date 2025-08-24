import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
  active: boolean;
}

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
    {
      label: 'Comunidad',
      route: '/community',
      icon: 'pi pi-users',
      active: false,
    },
    {
      label: 'Mensajes',
      route: '/messages',
      icon: 'pi pi-comments',
      active: false,
    },
    { label: 'Perfil', route: '/profile', icon: 'pi pi-user', active: false },
  ];

  constructor(private router: Router) {
    // Marcar como activo el item actual basado en la ruta
    this.updateActiveMenuItem();
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout(): void {
    // Aquí puedes agregar la lógica de logout
    console.log('Logout clicked');
    this.router.navigate(['/auth/login']);
  }

  onMenuItemClick(item: MenuItem): void {
    // Actualizar el estado activo
    this.menuItems.forEach((menuItem) => (menuItem.active = false));
    item.active = true;

    // Navegar a la ruta
    this.router.navigate([item.route]);
  }

  private updateActiveMenuItem(): void {
    const currentRoute = this.router.url;
    this.menuItems.forEach((item) => {
      item.active = currentRoute.includes(item.route);
    });
  }
}

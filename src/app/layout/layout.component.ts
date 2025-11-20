import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MenuDTO, MenuItem } from '../core/models/menu.model';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  isSidebarCollapsed = false;
  isUserMenuOpen = false;
  menuItems: MenuItem[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Suscribirse a los cambios de estado del usuario (incluyendo menús)
    this.authService.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        if (state.menus && state.menus.length > 0) {
          // Convertir MenuDTO a MenuItem
          this.menuItems = state.menus.map((menu: MenuDTO) => ({
            ...menu,
            active: false,
            expanded: false,
          }));
          this.updateActiveMenuItem();
        }
      });

    // Suscribirse a cambios de ruta para actualizar el menú activo
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveMenuItem();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
      this.menuItems.forEach((i: MenuItem) => {
        i.active = false;
        // También desactivar todos los hijos
        if (i.children) {
          i.children.forEach((child: MenuItem) => (child.active = false));
        }
      });
      item.active = true;
      // Navegar a la ruta absoluta bajo /app para evitar problemas desde rutas hijas
      const url = `/app/${item.ruta}`;
      this.router.navigateByUrl(url);
    }
  }

  private updateActiveMenuItem() {
    const currentRoute = this.router.url;
    
    const updateItemActiveState = (item: any) => {
      let isActive = false;
      
      // Procesar hijos primero (bottom-up)
      if (item.children && item.children.length > 0) {
        item.children.forEach((child: any) => {
          if (updateItemActiveState(child)) {
            isActive = true;
          }
        });
      }
      
      // Verificar si la ruta actual coincide con este ítem
      const routeMatch = item.ruta && currentRoute.includes(`/${item.ruta}`);
      
      // Actualizar el estado activo
      item.active = routeMatch || isActive;
      
      // Si es un padre con hijos activos, expandirlo
      if (item.children && item.children.length > 0) {
        item.expanded = item.children.some((child: any) => child.active || child.expanded);
      }
      
      return item.active;
    };
    
    // Procesar todos los ítems del menú
    this.menuItems.forEach(updateItemActiveState);
  }
}

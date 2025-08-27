import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

interface UserMenuItem {
  label: string;
  icon: string;
  route?: string;
  action?: () => void;
  type?: any;
}

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  @Input() isUserMenuOpen = false;
  @Output() toggleSidebarClick = new EventEmitter<void>();
  @Output() toggleUserMenuClick = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();

  userName: string = 'Usuario';
  private destroy$ = new Subject<void>();

  // Lista de items del menú
  userMenuItems: UserMenuItem[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getDisplayName
      .pipe(takeUntil(this.destroy$))
      .subscribe((name) => {
        this.userName = name;
      });

    // Inicializar los items del menú
    this.userMenuItems = [
      { label: 'Mi Perfil', icon: 'pi pi-user', route: '/profile' },
      { label: 'Configuración', icon: 'pi pi-cog', route: '/settings' },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        action: () => this.logout(),
        type: 'danger',
      },
    ];
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

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

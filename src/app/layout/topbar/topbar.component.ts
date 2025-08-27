import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
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

  nombreUsuario: string = 'Usuario';
  emailUsuario: string = 'usuario@email.com';
  private destroy$ = new Subject<void>();

  // Lista de items del menú
  userMenuItems: UserMenuItem[] = [];

  constructor(
    private authService: AuthService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.authService.state$.subscribe((state) => {
      this.nombreUsuario = this.formatName(state.nombre);
      this.emailUsuario = state.email;
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isUserMenuOpen) {
      const clickedInside = this.elementRef.nativeElement.contains(
        event.target
      );
      if (!clickedInside) {
        this.closeUserMenu();
      }
    }
  }

  toggleSidebar() {
    this.toggleSidebarClick.emit();
  }

  toggleUserMenu() {
    if (this.isUserMenuOpen) {
      this.closeUserMenu();
    } else {
      this.openUserMenu();
    }
  }

  openUserMenu() {
    this.isUserMenuOpen = true;
    this.toggleUserMenuClick.emit();
  }

  closeUserMenu() {
    this.isUserMenuOpen = false;
    this.toggleUserMenuClick.emit();
  }

  logout() {
    this.closeUserMenu();
    this.logoutClick.emit();
  }

  private formatName(name: string): string {
    if (!name || typeof name !== 'string') {
      return 'Usuario';
    }

    return name
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getUserInitials(): string {
    if (!this.nombreUsuario || this.nombreUsuario === 'Usuario') {
      return 'U';
    }

    const names = this.nombreUsuario.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }

    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  }
}

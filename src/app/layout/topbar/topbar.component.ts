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
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { ProfileModalComponent } from 'src/app/shared/components/profile-modal/profile-modal.component';
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

  nombreUsuario: string = '';
  emailUsuario: string = '';
  private destroy$ = new Subject<void>();

  // Lista de items del menú
  userMenuItems: UserMenuItem[] = [];

  constructor(
    private authService: AuthService,
    private elementRef: ElementRef,
    private dialogService$: DialogService
  ) {}

  ngOnInit() {
    // Cargar datos inmediatamente del estado actual
    this.updateUserData(this.authService.currentState);

    // Suscribirse a cambios futuros
    this.authService.state$.subscribe((state) => {
      this.updateUserData(state);
    });

    // Inicializar los items del menú
    this.userMenuItems = [
      {
        label: 'Mi Perfil',
        icon: 'pi pi-user',
        action: () => this.goToProfile(),
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        action: () => this.logout(),
        type: 'danger',
      },
    ];
  }

  goToProfile() {
    this.dialogService$.open(ProfileModalComponent, {
      header: 'Perfil',
      styleClass: 'p-app-modal',
      height: 'auto',
      width: '900px',
    });
  }

  goToSettings() {
    this.dialogService$.open(ProfileModalComponent, {
      header: 'Configuración',
      styleClass: 'p-app-modal',
    });
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

  private updateUserData(state: { nombre?: string; email?: string }): void {
    if (state.nombre && state.email) {
      this.nombreUsuario = this.formatName(state.nombre);
      this.emailUsuario = state.email;
    } else {
      this.nombreUsuario = 'Usuario';
      this.emailUsuario = 'usuario@email.com';
    }
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
    if (
      !this.nombreUsuario ||
      this.nombreUsuario === '' ||
      this.nombreUsuario === 'Usuario'
    ) {
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

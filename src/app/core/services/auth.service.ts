import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SESSION_KEY, TOKEN_KEY, USER_KEY } from '../constanst/keys';
import { MenuDTO } from '../models/menu.model';
import { PersistenceService } from './persistence.service';

interface AuthState {
  id: number;
  nombre: string;
  email: string;
  enSesion: boolean;
  rol?: string;
  menus?: MenuDTO[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private state: AuthState = {
    id: 0,
    nombre: '',
    email: '',
    enSesion: false,
  };

  private readonly initialState: AuthState = { ...this.state };
  private userSubject = new BehaviorSubject<AuthState>(this.state);

  // Único observable para todo el estado
  get state$(): Observable<AuthState> {
    return this.userSubject.asObservable();
  }

  // Getter sincrónico para el estado actual
  get currentState(): AuthState {
    return this.userSubject.getValue();
  }

  constructor(
    private persistence$: PersistenceService,
    private router$: Router
  ) {
    this.loadStoredUser();
  }

  private loadStoredUser() {
    const storedUser = this.persistence$.get(USER_KEY) as AuthState;
    const hasSession = Boolean(this.persistence$.get(SESSION_KEY));

    // Si tenemos usuario y sesión, restaurar el estado
    if (storedUser?.id && hasSession) {
      this.state = { ...storedUser, enSesion: true };
      this.userSubject.next(this.state);
    }
  }

  setAuth(partial: Partial<AuthState>) {
    this.state = {
      ...this.state,
      ...partial,
    };

    // Guardar el estado actualizado en localStorage
    this.persistence$.save(USER_KEY, this.state);
    if (this.state.enSesion) {
      this.persistence$.save(SESSION_KEY, true);
    }

    this.userSubject.next(this.state);
  }

  /** Guarda usuario y marca la sesión */
  setUser(user: AuthState) {
    // Asegurarnos que el usuario tenga la sesión marcada
    const userWithSession = { ...user, enSesion: true };

    // Guardar datos y estado de sesión
    this.persistence$.save(USER_KEY, userWithSession);
    this.persistence$.save(SESSION_KEY, true);

    // Actualizar el estado
    this.setAuth(userWithSession);
  }

  /** Marca sesión */
  setEnSession(enSesion: boolean) {
    this.persistence$.save(SESSION_KEY, enSesion);
    this.setAuth({ ...this.state, enSesion });
  }

  /** Verifica si hay sesión activa */
  isAuthenticated(): boolean {
    const storedUser = this.persistence$.get(USER_KEY) as AuthState;
    const hasSession = Boolean(this.persistence$.get(SESSION_KEY));

    return Boolean(hasSession && storedUser?.id);
  }

  /** Verifica si hay datos de usuario válidos */
  hasValidUserData(): boolean {
    const storedUser = this.persistence$.get(USER_KEY) as AuthState;
    return Boolean(storedUser?.id && storedUser?.nombre !== '');
  }

  /** Logout */
  logout() {
    // Primero limpiar el estado
    this.state = { ...this.initialState };
    this.userSubject.next(this.state);

    // Luego limpiar el almacenamiento
    this.persistence$.delete(USER_KEY);
    this.persistence$.delete(TOKEN_KEY);
    this.persistence$.delete(SESSION_KEY);

    // Solo navegar si no estamos ya en la página de login
    if (!this.router$.url.includes('/auth/login')) {
      this.router$.navigateByUrl('/auth/login');
    }
  }
}

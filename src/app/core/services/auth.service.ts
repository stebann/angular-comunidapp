import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SESSION_KEY, TOKEN_KEY, USER_KEY } from '../constanst/keys';
import { PersistenceService } from './persistence.service';

interface AuthState {
  id: number;
  nombre: string;
  email: string;
  enSesion: boolean;
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
    const storedUser = this.persistence$.get(USER_KEY) as AuthState;
    if (storedUser) {
      this.setAuth({
        id: storedUser.id,
        nombre: storedUser.nombre,
        email: storedUser.email,
        enSesion: storedUser.enSesion,
      });
    }
  }

  setAuth(partial: Partial<AuthState>) {
    this.state = {
      ...this.state,
      ...partial,
    };
    this.userSubject.next(this.state);
  }

  /** Guarda usuario*/
  setUser(user: AuthState) {
    this.persistence$.save(USER_KEY, user);
    this.setAuth(user);
  }

  /** Guarda token */
  setToken(token: string) {
    this.persistence$.save(TOKEN_KEY, token);
  }

  /** Obtiene token directamente */
  getToken(): string {
    return this.persistence$.get(TOKEN_KEY) || '';
  }

  /** Obtiene token */
  getTokenWithoutObs(): string {
    return this.getToken();
  }

  /** Marca sesión */
  setEnSession(enSesion: boolean) {
    this.persistence$.save(SESSION_KEY, enSesion);
  }

  /** Verifica si hay sesión activa */
  isAuthenticated(): boolean {
    return Boolean(this.persistence$.get(SESSION_KEY));
  }

  /** Logout */
  logout() {
    Object.assign(this.state, this.initialState);
    this.userSubject.next(this.state);

    this.persistence$.delete(USER_KEY);
    this.persistence$.delete(TOKEN_KEY);
    this.persistence$.delete(SESSION_KEY);

    this.router$.navigateByUrl('/auth/login');
  }
}

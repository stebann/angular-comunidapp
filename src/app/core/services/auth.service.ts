import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SESSION_KEY, TOKEN_KEY, USER_KEY } from '../constanst/keys';
import { PersistenceService } from './persistence.service';

interface AuthState {
  id: number;
  nombre: string;
  enSesion: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private state: AuthState = {
    id: 0,
    nombre: '',
    enSesion: false,
  };

  private readonly initialState: AuthState = { ...this.state };
  private userSubject = new BehaviorSubject<AuthState>(this.state);

  get user$(): Observable<AuthState> {
    return this.userSubject.asObservable();
  }

  get getDisplayName(): Observable<string> {
    return this.userSubject
      .asObservable()
      .pipe(map((user: AuthState) => user.nombre || 'Usuario'));
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

  /** Obtiene token sin observable (método legacy) */
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

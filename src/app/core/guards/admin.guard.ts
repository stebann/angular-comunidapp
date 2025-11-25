import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUser = this.authService.currentState;

    // Verificar si está autenticado y es admin
    if (this.authService.isAuthenticated() && currentUser.rol === 'ADMIN') {
      return true;
    }

    // Si no es admin, redirigir a inicio o login
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/auth/login');
    } else {
      this.router.navigateByUrl('/app');
    }

    return false;
  }
}

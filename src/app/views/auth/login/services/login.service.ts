import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAPI } from 'src/app/core/routes-api/auth_api';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { IAuthUser } from '../models/IAuthUser';
import { LoginRepository } from '../repositories/login-repository';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends LoginRepository {
  public loginForm = this.form();

  constructor(
    private http$: HttpService,
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  public login(): void {
    this.http$
      .post(AuthAPI.Ingresar, this.loginForm.value)
      .subscribe((user: IAuthUser) => {
        this.loginSuccess(user);
      });
  }

  private loginSuccess(user: IAuthUser): void {
    this.authService.setUser({
      id: user.id,
      email: user.email,
      nombre: user.nombreCompleto,
      enSesion: true,
    });

    this.router.navigate(['/app/inicio']);

    this.loginForm.reset();
  }
}

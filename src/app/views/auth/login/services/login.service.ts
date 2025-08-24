import { Injectable } from '@angular/core';
import { AuthAPI } from 'src/app/core/routes-api/auth_api';
import { HttpService } from 'src/app/core/services/http.service';
import { LoginRepository } from '../repositories/login-repository';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends LoginRepository {
  public loginForm = this.form();

  constructor(private http$: HttpService) {
    super();
  }

  public login(): void {
    this.http$.post(AuthAPI.Ingresar, this.loginForm.value);
  }
}

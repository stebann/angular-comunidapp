import { Injectable } from '@angular/core';
import { LoginRepository } from '../repositories/login.repository';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends LoginRepository {
  public loginForm = this.form();
}

import { Injectable } from '@angular/core';

import { AuthAPI } from 'src/app/core/routes-api/auth_api';
import { HttpService } from 'src/app/core/services/http.service';
import { RegisterRepository } from '../repositories/register-repository';

@Injectable({
  providedIn: 'root',
})
export class RegisterService extends RegisterRepository {
  public registerForm = this.form();

  constructor(private http$: HttpService) {
    super();
  }

  public register(): void {
    if (this.registerForm.valid) {
      this.http$.post(AuthAPI.Registrar, this.registerForm.value);
    }
  }
}

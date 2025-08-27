import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { AuthAPI } from 'src/app/core/routes-api/auth_api';
import { HttpService } from 'src/app/core/services/http.service';
import { AppMessagesServices } from 'src/app/core/services/toas.service';
import { RegisterRepository } from '../repositories/register-repository';

@Injectable({
  providedIn: 'root',
})
export class RegisterService extends RegisterRepository {
  public registerForm = this.form();

  constructor(
    private http$: HttpService,
    private router: Router,
    private messageService: AppMessagesServices
  ) {
    super();
  }

  public register(): void {
    this.http$
      .post(AuthAPI.Registrar, this.registerForm.value)
      .subscribe(() => {
        this.messageService.exito('Usuario creado exitosamente.');

        this.router.navigate(['/auth/login']);
      });
  }
}

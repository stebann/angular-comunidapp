import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private loginService: LoginService) {}

  get loginForm() {
    return this.loginService.loginForm;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginService.login();
    }
  }
}

import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoading = false;
  showPassword = false;

  constructor(private loginService$: LoginService) {}

  get loginForm() {
    return this.loginService$.loginForm;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginService$.loginForm.valid) {
      this.isLoading = true;

      // Simular carga
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  }
}

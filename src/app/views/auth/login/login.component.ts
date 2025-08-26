import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  get loginForm() {
    return this.loginService.loginForm;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginService.login();

      this.router.navigate(['/app']);
    }
  }
}

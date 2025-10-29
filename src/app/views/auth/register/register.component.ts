import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  goToLanding(): void {
    this.router.navigate(['/']);
  }

  get registerForm() {
    return this.registerService.registerForm;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.registerService.register();
    }
  }
}

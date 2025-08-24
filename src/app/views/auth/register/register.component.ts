import { Component } from '@angular/core';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private registerService: RegisterService) {}

  get registerForm() {
    return this.registerService.registerForm;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.registerService.register();
    }
  }
}

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export class RegisterRepository {
  public form(): FormGroup {
    return new FormBuilder().group({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl(null, [Validators.required]),
      acceptTerms: [false, [Validators.requiredTrue]],
    });
  }
}

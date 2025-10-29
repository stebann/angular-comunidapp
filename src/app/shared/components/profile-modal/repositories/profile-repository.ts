import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export class ProfileRepository {
  public form(): FormGroup {
    return new FormBuilder().group({
      avatarUrl: new FormControl(null),

      nombreCompleto: new FormControl(null, [
        Validators.required,
        Validators.maxLength(60),
      ]),

      email: new FormControl(null, [Validators.required, Validators.email]),

      telefono: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ]),

      direccion: new FormControl(null, [
        Validators.required,
        Validators.maxLength(120),
      ]),
    });
  }
}

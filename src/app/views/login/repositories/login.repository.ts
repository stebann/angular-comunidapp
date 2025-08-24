import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export class LoginRepository {
  public form(): FormGroup {
    return new FormBuilder().group({
      usuario: new FormControl(null, [Validators.required]),
      contrasena: new FormControl(null, [Validators.required]),
      recordar: [false],
    });
  }
}

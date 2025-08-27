import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export class RegisterRepository {
  public form(): FormGroup {
    return new FormBuilder().group({
      nombreCompleto: new FormControl(null, [
        Validators.required,
        Validators.minLength(15),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      contrasena: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmarContrasena: new FormControl(null, [Validators.required]),
      aceptarTerminos: [false, [Validators.requiredTrue]],

      nombreUsuario: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/),
      ]),
      telefono: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
      ]),
      direccion: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }
}

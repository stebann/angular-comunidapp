import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export class MisNegociosRepository {
  public form(): FormGroup {
    return new FormBuilder().group({
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      direccion: new FormControl(null),
      telefono: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email]),
      sitioWeb: new FormControl(null),
      tieneEnvio: new FormControl(false),
      categoriaId: new FormControl(null, [Validators.required]),
    });
  }
}

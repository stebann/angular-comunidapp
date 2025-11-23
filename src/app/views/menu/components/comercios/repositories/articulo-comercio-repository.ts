import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export class ArticuloComercioRepository {
  public form(): FormGroup {
    return new FormBuilder().group({
      titulo: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      descripcion: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      categoriaCodigo: new FormControl(null, [Validators.required]),
      condicionCodigo: new FormControl(null, [Validators.required]),
      tipoTransaccionCodigo: new FormControl(1, [Validators.required]), // 1 = Venta por defecto
      precio: new FormControl(null, [Validators.min(0)]),
      categoriaComercioId: new FormControl(null, [Validators.required]),
      imagenes: new FormControl([]),
    });
  }
}

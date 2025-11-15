import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export class MisArticulosRepository {
  public new(): FormGroup {
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
      tipoTransaccionCodigo: new FormControl(null, [Validators.required]),
      precio: new FormControl(null, [Validators.min(0)]),
      imagenes: new FormControl([]),
    });
  }

  public edit(): FormGroup {
    return new FormBuilder().group({
      id: new FormControl(null),
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
      tipoTransaccionCodigo: new FormControl(null, [Validators.required]),
      precio: new FormControl(null, [Validators.min(0)]),
      imagenes: new FormControl([]),
      disponible: new FormControl(true),
    });
  }

  public filtro(): FormGroup {
    return new FormBuilder().group({
      estado: new FormControl(null, [Validators.required]),
      categoriaArticulo: new FormControl(null, [Validators.required]),
      fechaDesde: new FormControl(null),
      fechaHasta: new FormControl(null),
      usuarioSolicitante: new FormControl(null),
    });
  }
}

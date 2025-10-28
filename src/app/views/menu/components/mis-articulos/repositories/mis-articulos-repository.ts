import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export class MisArticulosRepository {
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
      categoriaId: new FormControl(null, [Validators.required]),
      estadoId: new FormControl(null, [Validators.required]),
      tipoTransaccionId: new FormControl(null, [Validators.required]),
      precio: new FormControl(0, [Validators.required, Validators.min(0)]),
      imagenes: new FormControl([]),
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

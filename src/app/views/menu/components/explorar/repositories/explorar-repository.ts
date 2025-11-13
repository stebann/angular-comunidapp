import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export class ExplorarRepository {
  public filtro(): FormGroup {
    return new FormBuilder().group({
      estado: new FormControl(null),
      categoriaArticulo: new FormControl(null),
      fechaDesde: new FormControl(new Date(), [Validators.required]),
      fechaHasta: new FormControl(new Date(), [Validators.required]),
      usuarioSolicitante: new FormControl(null),
    });
  }
}

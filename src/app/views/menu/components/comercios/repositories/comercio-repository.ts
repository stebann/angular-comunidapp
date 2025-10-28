import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export class ComercioRepository {
  public filtro(): FormGroup {
    return new FormBuilder().group({
      estado: new FormControl(null, [Validators.required]),
      categoriaArticulo: new FormControl(null, [Validators.required]),
      fechaDesde: new FormControl(null),
      fechaHasta: new FormControl(null),
      usuarioSolicitante: new FormControl(null),
    });
  }

  filtroDetalle(): FormGroup {
    return new FormBuilder().group({
      estado: new FormControl(null, [Validators.required]),
      categoriaArticulo: new FormControl(null, [Validators.required]),
      fechaDesde: new FormControl(null),
      fechaHasta: new FormControl(null),
      usuarioSolicitante: new FormControl(null),
      articulo: new FormControl(null),
      numeroGestion: new FormControl(null),
    });
  }
}

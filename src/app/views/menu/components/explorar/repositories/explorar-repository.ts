import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export class ExplorarRepository {
  public filtro(): FormGroup {
    return new FormBuilder().group({
      categoriaId: new FormControl(null),
      estadoId: new FormControl(null),
      tipoTransaccionId: new FormControl(null),
      fechaDesde: new FormControl(null),
      fechaHasta: new FormControl(null),
    });
  }
}

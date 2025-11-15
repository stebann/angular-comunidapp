import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export class ArticuloDetailRepository {
  public detalle(): FormGroup {
    return new FormBuilder().group({
      id: new FormControl(null),
      titulo: new FormControl(null),
      descripcion: new FormControl(null),
      categoriaCodigo: new FormControl(null),
      categoriaNombre: new FormControl(null),
      condicionCodigo: new FormControl(null),
      condicionNombre: new FormControl(null),
      estadoArticuloCodigo: new FormControl(null),
      estadoArticuloNombre: new FormControl(null),
      tipoTransaccionCodigo: new FormControl(null),
      tipoTransaccionNombre: new FormControl(null),
      precio: new FormControl(null),
      imagenes: new FormControl([]),
      creadoEn: new FormControl(null),
    });
  }
}

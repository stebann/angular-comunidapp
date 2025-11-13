import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export class AdminUsuariosRepository {
  public form(): FormGroup {
    return new FormBuilder().group({
      rol: new FormControl('', []),
    });
  }
}

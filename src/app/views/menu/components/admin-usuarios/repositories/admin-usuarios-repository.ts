import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class AdminUsuariosRepository {
  private fb = new FormBuilder();

  public form(): FormGroup {
    return this.fb.group({
      rol: [null, Validators.nullValidator],
    });
  }
}

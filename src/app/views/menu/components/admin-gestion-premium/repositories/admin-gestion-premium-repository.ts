import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class AdminGestionPremiumRepository {
  private fb = new FormBuilder();

  public filtro(): FormGroup {
    return this.fb.group({
      rol: [null, Validators.nullValidator],
    });
  }
}

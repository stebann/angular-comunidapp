import { Directive, Host, Optional, SkipSelf } from '@angular/core';
import { ControlContainer, FormControlName } from '@angular/forms';

@Directive({
  selector: '[formControlName]',
})
export class SafeFormControlNameDirective {
  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
    @Optional() @Host() private formControlName: FormControlName
  ) {}

  ngOnInit() {
    if (this.formControlName && this.controlContainer) {
      const controlName = this.formControlName.name;
      const formGroup = this.controlContainer.control;

      if (formGroup && !formGroup.get(controlName as string)) {
        console.warn(
          `FormControl '${controlName}' not found in FormGroup. Ignoring.`
        );
        // Prevent the error by not setting up the control
        this.formControlName.name = null as any;
      }
    }
  }
}

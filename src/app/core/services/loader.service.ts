import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading: boolean = false;

  constructor(private spinner: NgxSpinnerService) {}

  setLoading(loading: boolean) {
    this.loading = loading;

    if (this.loading) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }

  getLoading(): boolean {
    return this.loading;
  }
}

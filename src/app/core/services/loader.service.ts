import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading$ = new BehaviorSubject<boolean>(false);
  private pendingRequests = 0;
  private debounceTime = 200;
  private hideSpinnerTimer: any;

  constructor(private spinner: NgxSpinnerService) {
    // Suscribirse a los cambios de loading con debounce
    this.loading$
      .pipe(distinctUntilChanged(), debounceTime(this.debounceTime))
      .subscribe((loading) => {
        if (loading) {
          this.spinner.show();
        } else {
          this.spinner.hide();
        }
      });
  }

  show() {
    this.pendingRequests++;
    this.loading$.next(true);
    if (this.hideSpinnerTimer) {
      clearTimeout(this.hideSpinnerTimer);
      this.hideSpinnerTimer = null;
    }
  }

  hide() {
    this.pendingRequests--;
    if (this.pendingRequests <= 0) {
      this.pendingRequests = 0;
      // Retrasar la ocultación del spinner
      this.hideSpinnerTimer = setTimeout(() => {
        this.loading$.next(false);
      }, this.debounceTime);
    }
  }

  getLoading(): boolean {
    return this.loading$.value;
  }
}

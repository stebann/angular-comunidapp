import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loaderService.setLoading(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests <= 0) {
          this.totalRequests = 0;
          this.loaderService.setLoading(false);
        }
      })
    );
  }
}

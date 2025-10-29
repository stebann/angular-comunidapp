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
  constructor(private loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Solo mostrar el spinner para peticiones que no sean de filtros o búsquedas
    if (!request.url.includes('filtros') && !request.url.includes('buscar')) {
      this.loaderService.show();
    }

    return next.handle(request).pipe(
      finalize(() => {
        if (
          !request.url.includes('filtros') &&
          !request.url.includes('buscar')
        ) {
          this.loaderService.hide();
        }
      })
    );
  }
}

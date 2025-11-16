import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppMessagesServices } from '../services/toas.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private messageService$: AppMessagesServices
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Mostrar siempre el mensaje del backend si existe
        if (error.error && error.error.message) {
          if (Array.isArray(error.error.message)) {
            error.error.message.forEach((msg: string) => {
              this.messageService$.error(msg);
            });
          } else {
            this.messageService$.error(error.error.message);
          }
        } else {
          // Mensaje genérico si no hay mensaje del backend
          this.messageService$.error('Ocurrió un error. Intenta nuevamente.');
        }

        return throwError(() => error);
      })
    );
  }
}

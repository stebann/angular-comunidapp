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
import { AuthService } from '../services/auth.service';
import { AppMessagesServices } from '../services/toas.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private sessionExpired: boolean = false;
  constructor(
    private messageService$: AppMessagesServices,
    private auth$: AuthService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          (error.status == 401 || error.status == 403) &&
          !this.sessionExpired
        ) {
          this.sessionExpired = true;
          this.messageService$.info(
            'Su sesión se ha vencido, por favor vuelva a ingresar'
          );

          setTimeout(() => {
            this.sessionExpired = false;
          }, 5000);
        }

        if (Array.isArray(error.error.message)) {
          error.error.message.map((msg: string) => {
            this.messageService$.error(msg);
          });
        } else {
          this.messageService$.error(error.error.message);
        }

        return throwError(() => {
          return error;
        });
      })
    );
  }
}

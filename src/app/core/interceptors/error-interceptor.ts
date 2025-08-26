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
        // Manejar errores de autenticación
        if (error.status === 401 || error.status === 403) {
          if (!this.sessionExpired) {
            this.sessionExpired = true;
            this.messageService$.error('Credenciales inválidas.');

            setTimeout(() => {
              this.sessionExpired = false;
            }, 5000);
          }
        }

        // Manejar errores de red/CORS
        if (error.status === 0) {
          this.messageService$.error(
            'Error de conexión. Verifica que el servidor esté funcionando.'
          );
        }

        // Manejar errores del servidor (500, 502, etc.)
        if (error.status >= 500) {
          this.messageService$.error('Error del servidor. Intenta más tarde.');
        }

        // Manejar errores de validación (400)
        if (error.status === 400) {
          if (error.error && error.error.message) {
            if (Array.isArray(error.error.message)) {
              error.error.message.forEach((msg: string) => {
                this.messageService$.error(msg);
              });
            } else {
              this.messageService$.error(error.error.message);
            }
          } else {
            this.messageService$.error(
              'Datos inválidos. Verifica la información ingresada.'
            );
          }
        }

        // Manejar errores no manejados
        if (
          error.status !== 401 &&
          error.status !== 403 &&
          error.status !== 0 &&
          error.status < 500
        ) {
          if (error.error && error.error.message) {
            this.messageService$.error(error.error.message);
          } else {
            this.messageService$.error('Ha ocurrido un error inesperado.');
          }
        }

        return throwError(() => error);
      })
    );
  }
}

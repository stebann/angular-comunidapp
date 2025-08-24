import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from 'src/env/environment';
import { IHttpModel, IoptionModel, ItypeGeneric } from '../models/IHttp-model';
import { EnvResolver } from '../utils/env-resolver';
import { Validators } from '../utils/validators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public params = new HttpParams();
  public basePatch: string = EnvResolver.getEnvValueByKey(environment.apiUrl);
  public headers$: HttpHeaders | undefined;
  private token: string | undefined;

  constructor(private _http: HttpClient, private readonly auth$: AuthService) {
    this.token = this.auth$.getTokenWithoutObs();
    this.init();
  }

  init(): void {
    this.headers$ = this.httpOptions();
  }

  private httpOptions(): HttpHeaders {
    if (this.token) {
      return this.jsonAuth();
    }
    return this.notAuth();
  }

  private jsonAuth = (): HttpHeaders =>
    new HttpHeaders().set('Authorization', `${this.token}`);

  private notAuth = () =>
    new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

  public get<T = any>(
    url: string,
    params?: HttpParams,
    endpoint?: string
  ): Observable<any> {
    let path$ = `${this.basePatch}${url}`;

    const headers = {
      headers: this.headers$,
      params,
    };

    if (!Validators.isNullOrUndefined<string>(endpoint)) {
      path$ = `${endpoint}${url}`;
    }

    return this._http.get(path$, headers).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  public buffer(
    method: string,
    url: string,
    options: IoptionModel,
    endpoint?: string
  ): Observable<ArrayBuffer> {
    let path$ = `${this.basePatch}${url}`;

    if (!Validators.isNullOrUndefined<string>(endpoint)) {
      path$ = `${endpoint}${url}`;
    }

    return this._http
      .request(method, path$, {
        headers: options.headers ?? this.headers$,
        responseType: 'arraybuffer',
      })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  public generic({
    url,
    method,
    options,
    endpoint,
  }: IHttpModel): Observable<any> {
    let path$ = `${this.basePatch}${url}`;

    if (!Validators.isNullOrUndefined<string>(endpoint)) {
      path$ = `${endpoint}${url}`;
    }

    return this._http
      .request(method, path$, {
        body: options.body,
        headers: options.headers ?? this.headers$,
        responseType: options.responseType || undefined,
      })
      .pipe(catchError(this.handleError));
  }

  public post<T>(
    url: string,
    data?: any | FormData,
    endpoint?: string,
    responseType?: string
  ): Observable<any> {
    let path$ = `${this.basePatch}${url}`;

    const requestOptions: { [x: string]: string | any } = {
      headers: this.headers$,
      responseType: responseType ? responseType : null,
    };
    if (!Validators.isNullOrUndefined<string>(endpoint)) {
      path$ = `${endpoint}${url}`;
    }
    return this._http.post(path$, data, requestOptions).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  public postFormData<T>(
    url: string,
    data?: FormData,
    endpoint?: string,
    responseType?: string
  ): Observable<any> {
    let path$ = `${this.basePatch}${url}`;

    if (!Validators.isNullOrUndefined<string>(endpoint)) {
      path$ = `${endpoint}${url}`;
    }
    return this._http.post(path$, data).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  public put<T>(url: string, data: any, endpoint?: string): Observable<any> {
    let path$ = `${this.basePatch}${url}`;

    const headers = {
      headers: this.headers$,
    };

    if (!Validators.isNullOrUndefined<string>(endpoint)) {
      path$ = `${endpoint}${url}`;
    }
    return this._http.put(path$, data, headers).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  public putFormData<T>(
    url: string,
    data: FormData,
    endpoint?: string
  ): Observable<any> {
    let path$ = `${this.basePatch}${url}`;

    if (!Validators.isNullOrUndefined<string>(endpoint)) {
      path$ = `${endpoint}${url}`;
    }
    return this._http.put(path$, data).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  public delete<T>(url: string, endpoint?: string): Observable<any> {
    let path$ = `${this.basePatch}${url}`;
    const headers = {
      headers: this.headers$,
    };

    if (!Validators.isNullOrUndefined<string>(endpoint)) {
      path$ = `${endpoint}${url}`;
    }
    return this._http.delete(path$, headers).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  public patch<T>(url: string, data: any, endpoint?: string): Observable<any> {
    let path$ = `${this.basePatch}${url}`;
    const headers = {
      headers: this.headers$,
    };

    if (!Validators.isNullOrUndefined<string>(endpoint)) {
      path$ = `${endpoint}${url}`;
    }
    return this._http.patch(path$, data, headers).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  public handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(error);
  }

  public customHeaders(headerOptions: ItypeGeneric[]) {
    let customHeader = new HttpHeaders();
    customHeader = customHeader.append('Authorization', `Bearer ${this.token}`);
    customHeader = customHeader.append('X-ISSUE-TYPE', 'V2');
    customHeader = customHeader.append('X-ASYNC', 'false');
    customHeader = customHeader.append('X-REF-TEMPLATE', 'FactureOne');
    customHeader = customHeader.append('X-DOCUMENT-SOURCE', 'API: WEB');

    headerOptions.forEach((option: ItypeGeneric) => {
      customHeader = customHeader.append(
        option['name'],
        option['value'] ? option['value'] : ''
      );
    });
    this.headers$ = customHeader;
  }
}

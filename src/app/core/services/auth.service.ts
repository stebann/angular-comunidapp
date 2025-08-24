import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getTokenWithoutObs(): string {
    const tkn = '';
    return tkn;
  }
}

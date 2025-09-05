import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Validators } from '../utils/validators';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  constructor(
    private localSet$: LocalStorageService,
    private Crypto$: CryptoService
  ) {}

  save(key: string, value: any) {
    try {
      const _key = this.Encript(key).toString();
      const _value = this.Encript(JSON.stringify(value)).toString();
      this.localSet$.store(_key, _value);
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  get(key: string) {
    try {
      const _key = this.Encript(key).toString();
      const valueEncript = this.localSet$.retrieve(_key);

      if (Validators.isNullOrUndefined(valueEncript)) {
        const debugValue = localStorage.getItem(`debug_${key}`);
        if (debugValue) {
          return JSON.parse(debugValue);
        }
        return null;
      }

      const decryptedValue = this.Crypto$.Decrypt(valueEncript);
      return JSON.parse(decryptedValue);
    } catch (error) {
      console.error(
        'PersistenceService - Error decrypting/parsing value:',
        error
      );
      try {
        const fallbackValue = localStorage.getItem(key);
        if (fallbackValue) {
          return JSON.parse(fallbackValue);
        }
      } catch (fallbackError) {
        console.error(
          'PersistenceService - Fallback also failed:',
          fallbackError
        );
      }
      return null;
    }
  }

  delete = (key: string) => this.localSet$.clear(this.Encript(key).toString());

  deleteAll = () => {
    this.localSet$.clear();
    location.reload();
  };

  clearStorage = () => {
    this.localSet$.clear();
  };
  private Encript = (value: string) => this.Crypto$.Encript(value).toString();
}

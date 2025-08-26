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
    const _key = this.Encript(key);
    const _value = this.Encript(JSON.stringify(value));
    this.localSet$.store(_key, _value);
  }
  get(key: string) {
    const _key = this.Encript(key);
    const valueEncript = this.localSet$.retrieve(_key);
    if (Validators.isNullOrUndefined(valueEncript)) {
      return null;
    }
    return JSON.parse(this.Crypto$.Decrypt(valueEncript));
  }

  delete = (key: string) => this.localSet$.clear(this.Encript(key));

  deleteAll = () => {
    this.localSet$.clear();
    location.reload();
  };

  clearStorage = () => {
    this.localSet$.clear();
  };
  private Encript = (value: string) => this.Crypto$.Encript(value).toString();
}

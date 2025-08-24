import { environment } from 'src/env/environment';

export class EnvResolver {
  static getEnvValueByKey(key: string) {
    return (environment as Record<string, any>)[key] || '';
  }
}

export class Validators {
  static isNullOrUndefined<T>(
    obj: T | null | undefined
  ): obj is null | undefined {
    return typeof obj === 'undefined' || obj === null;
  }

  static isNullOrWhiteSpace(str: any): boolean {
    if (str) {
      return str === null || str.match(/^ *$/) !== null;
    }
    return true;
  }

  static cleanObject(obj: any): any {
    for (const propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === ''
      ) {
        delete obj[propName];
      }
    }

    return obj;
  }

  static isValidForm(formValue: any): boolean {
    let found = true;
    for (const key in formValue) {
      if (Object.prototype.hasOwnProperty.call(formValue, key)) {
        const element = formValue[key];
        if (!element.isValid) {
          found = false;
          break;
        }
      }
    }
    return found;
  }
}

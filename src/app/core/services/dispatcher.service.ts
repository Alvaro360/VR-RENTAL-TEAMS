import {Injectable} from '@angular/core';

import {noop} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispatcherService {
  private functions = {};

  constructor() {
  }

  register(key: string, fn: Function, observerKey?: string): void {
    if (!key || !fn) {
      return;
    }

    if (this.functions[key] === undefined) {
      this.functions[key] = new Map();
    }

    if (observerKey) {
      this.functions[key].set(observerKey, fn);
    } else {
      this.functions[key].set(Math.random().toString(36).substr(2, 6), fn);
    }
  }

  unregister(key: string): void {
    if (!key) {
      return;
    }

    delete this.functions[key];
  }

  unregisterFunction(key: string, fnOrObserverKey: Function | string): void {
    if (!key || !fnOrObserverKey) {
      return;
    }

    const fns = this.functions[key];
    if (!fns) {
      throw 'Key ' + key + ' is invalid';
    }

    if (typeof fnOrObserverKey === 'string') {
      fns.delete(fnOrObserverKey);
    } else {
      fns.forEach((value, key) => {
        if (value === fnOrObserverKey) {
          fns.delete(key);
        }
      });
    }
  }

  exec(key: string, ...args): void {
    if (!key || (typeof key !== 'string')) {
      return;
    }

    const fns = this.functions[key];
    if (!fns) {
      return;
    }

    fns.forEach(value => {
      (value || noop).apply(null, args);
    });
  }
}

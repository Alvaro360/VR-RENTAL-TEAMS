import { Injectable } from '@angular/core';
import {LoaderComponent} from '../loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader: LoaderComponent;
  private count: number;

  constructor() { }

  register(loader: LoaderComponent): void {
    if (this.loader) {
      this.loader.show = false;
    }

    this.loader = loader;
    this.count = 0;
  }

  unregister(): void {
    this.loader = null;
    this.count = 0;
  }

  start(): void {
    if (!this.loader) {
      return;
    }

    this.count++;
    this.loader.show = true;
  }

  stop(): void {
    if (!this.loader) {
      return;
    }

    this.count = this.count > 0 ? this.count - 1 : 0;
    if (this.count === 0) {
      this.loader.show = false;
    }
  }

  clear(): void {
    if (!this.loader) {
      return;
    }

    this.loader.show = false;
    this.count = 0;
  }
}

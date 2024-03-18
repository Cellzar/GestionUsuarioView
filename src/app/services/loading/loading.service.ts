import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoading: boolean = false;

  constructor() {}

  show() {
    this.isLoading = true;
  }

  hide() {
    this.isLoading = false;
  }

  isLoadingStatus(): boolean {
    return this.isLoading;
  }
}

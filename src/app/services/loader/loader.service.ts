import { Service, signal } from '@angular/core';

@Service()
export class LoaderService {
  setLoader = signal<boolean>(false);
  getLoader = this.setLoader.asReadonly();
}

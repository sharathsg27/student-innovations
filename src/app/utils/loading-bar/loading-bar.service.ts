import {Injectable} from '@angular/core';
import {LoadingBarService} from '@ngx-loading-bar/core';

@Injectable({
  providedIn: 'root'
})
export class AppLoadingBarService {

  constructor(private loadingBarService: LoadingBarService) {
  }

  startLoading() {
    this.loadingBarService.start();
  }

  stopLoading() {
    this.loadingBarService.stop();
  }
}

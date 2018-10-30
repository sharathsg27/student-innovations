import {Injectable} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {AppService} from '../../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class AppSpinnerService {

  constructor(private spinner: NgxSpinnerService,
              private appService: AppService) {
  }

  showSpinner() {
    this.appService.loadingStatus.next(true);
    this.spinner.show();
  }

  hideSpinner() {
    this.appService.loadingStatus.next(false);
    this.spinner.hide();
  }

}

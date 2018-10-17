import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastNotifService: ToastrService) {
    // Assign the selected theme name to the `theme` property of the instance of ToastaConfig.
    // Possible values: default, bootstrap, material
  }

  showSuccessMessage(message: string, title?: string) {
    this.toastNotifService.success(message, title, {
      positionClass: 'toast-bottom-left'
    });
  }

  showErrorMessage(message: string, title?: string) {
    this.toastNotifService.error(message, title, {
      positionClass: 'toast-bottom-left'
    });
  }

  showWarningMessage(message: string, title?: string) {
    this.toastNotifService.warning(message, title, {
      positionClass: 'toast-bottom-left'
    });
  }
}

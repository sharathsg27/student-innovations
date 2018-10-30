import {Injectable} from '@angular/core';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  toastOptions: ToastOptions = {
    title: '',
    msg: '',
    showClose: true,
    timeout: 5000,
    theme: 'default',
    onAdd: (toast: ToastData) => {
      console.log('Toast ' + toast.id + ' has been added!');
    },
    onRemove: function (toast: ToastData) {
      console.log('Toast ' + toast.id + ' has been removed!');
    }
  };

  constructor(private toastyService: ToastyService) {
    // Assign the selected theme name to the `theme` property of the instance of ToastaConfig.
    // Possible values: default, bootstrap, material

  }

  showSuccessMessage(message: string, title?: string) {
    this.toastOptions.msg = message;
    this.toastOptions.title = title;
    this.toastyService.success(this.toastOptions);
  }

  showErrorMessage(message: string, title?: string) {
    this.toastOptions.msg = message;
    this.toastOptions.title = title;
    this.toastyService.error(this.toastOptions);
  }

  showWarningMessage(message: string, title?: string) {
    this.toastOptions.msg = message;
    this.toastOptions.title = title;
    this.toastyService.warning(this.toastOptions);
  }

  /*showSuccessMessage(message: string, title?: string) {
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
  }*/
}

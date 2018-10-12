import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {NotificationService} from '../notifications/notification.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../../components/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsHandler implements ErrorHandler {

  // Because the ErrorHandler is created before the providers, we’ll have to use the Injector to get them.
  notificationService = this.injector.get(NotificationService);

  constructor(private injector: Injector,
              private router: Router) {
  }

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        return this.notificationService.showErrorMessage('No Internet Connection');
      } else {
        // Handle Http Error (error.status === 403, 404...)
        return this.notificationService.showErrorMessage(`${error.status} - ${error.message}`);
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
      this.router.navigate(['/registration']);
      return this.notificationService.showErrorMessage(`${error.message}`);
    }
  }
}




import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {ErrorHandlerService} from '../../utils/error-handler/error-handler';
import {AppService} from '../../services/app.service';
import {NotificationService} from '../../utils/notifications/notification.service';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userId: string;
  isLoggedIn: boolean;
  isLoading: boolean;
  isRegistrationComplete: boolean;

  constructor(private appService: AppService,
              private router: Router,
              private notifService: NotificationService,
              private loadingBarService: LoadingBarService,
              private errorHandlerService: ErrorHandlerService
  ) {
    appService.isLoggedIn$.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    appService.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
    appService.isRegistrationComplete$.subscribe(isRegistrationComplete => this.isRegistrationComplete = isRegistrationComplete);
  }

  ngOnInit() {
  }

  logout() {
    this.loadingBarService.start();
    this.appService.logOut()
      .then(() => {
        this.isLoggedIn = false;
        this.appService.loggedInStatus.next(this.isLoggedIn);
        this.loadingBarService.stop();
        this.notifService.showSuccessMessage('You have logged out successfully!', 'Logged Out');
        this.router.navigate(['/login']);
      })
      .catch(e => {
        this.errorHandlerService.handleError(e);
      });
  }

}

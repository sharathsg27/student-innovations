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
  isLoggedIn: boolean;

  constructor(private appService: AppService,
              private router: Router,
              private notifService: NotificationService,
              private loadingBarService: LoadingBarService,
              private errorHandlerService: ErrorHandlerService,
              private afAuth: AngularFireAuth) {
    appService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnInit() {
    this.checkUser();
  }

  async checkUser() {
    try {
      const user = await this.appService.checkAuth();
      if (user) {
        this.isLoggedIn = true;
      }
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }


  logout() {
    this.loadingBarService.start();
    this.appService.logOut()
      .then((success) => {
        this.isLoggedIn = false;
        this.appService.loggedInStaus.next(this.isLoggedIn);
        this.loadingBarService.stop();
        this.router.navigate(['/registration']);
      })
      .catch(e => {
        this.errorHandlerService.handleError(e);
      });
  }

}

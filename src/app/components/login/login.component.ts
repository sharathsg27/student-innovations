import {Component, ElementRef, AfterViewInit} from '@angular/core';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {PhoneSignInClass} from '../../classes/class';
import {WindowService} from '../../utils/window/window.service';
import {environment} from '../../../environments/environment';
import {MessageService} from '../../utils/messages/message.service';
import {NotificationService} from '../../utils/notifications/notification.service';
import {ErrorHandlerService} from '../../utils/error-handler/error-handler';
import {AppService} from '../../services/app.service';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {AppSpinnerService} from '../../utils/spinner/app.spinner.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  windowRef: any;
  isLoggedIn = false;
  loggedInUser;
  phoneSignInClass = new PhoneSignInClass();
  provider = new firebase.auth.GoogleAuthProvider();
  formRequiredMessage = new MessageService();
  verificationCodeSent: boolean;
  siteToken = environment.phoneSignInSettings.siteToken;

  constructor(private router: Router,
              private window: WindowService,
              private notificationService: NotificationService,
              private errorHandlerService: ErrorHandlerService,
              private loadingBarService: LoadingBarService,
              private elementRef: ElementRef,
              private appService: AppService,
              private spinnerService: AppSpinnerService) {
    appService.isLoggedIn$.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  ngAfterViewInit() {
    this.setWindowRecaptcha();
    this.checkUser().then(user => {
      if (user) {
        this.isLoggedIn = true;
        this.router.navigate(['/registration']);
      }
    });
  }

  // Check User credentials
  async checkUser() {
    try {
      return await this.appService.checkAuth();
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }

  // Set Recaptcha verifier
  setWindowRecaptcha() {
    this.windowRef = this.window.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible'
    });
    this.windowRef.recaptchaVerifier.render().then((widgetId) => {
      this.windowRef.recaptchaWidgetId = widgetId;
    });
  }


  /*// Email Link SignIn
  sendEmailLink(event, model) {
    event.preventDefault();
    try {
      this.appService.sendEmailLink(model.value).then(result => {
        if (result) {
          this.notificationService.showSuccessMessage('Please click the link sent to your account to confirm & login',
            'Email Verification');
        }
      });
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }*/

  /*// Custom SignIn
  async emailSignIn() {
    if (this.newUserSignIn && this.newUserSignIn.email && this.newUserSignIn.password) {
      try {
        const user = await this.appService.emailSignIn(this.newUserSignIn);
        if (user) {
          this.notificationService.showSuccessMessage('Login Successfull!',
            'Email Login');
          this.router.navigate(['/home']);
        }
      } catch (e) {
        this.errorHandlerService.handleError(e);
      }
    }
  }*/

  // Send Mobile number verification code
  async sendVerificationCode(event) {
    event.preventDefault();
    const phoneNumber = this.phoneSignInClass.number;
    const appVerifier = this.windowRef.recaptchaVerifier;
    try {
      this.spinnerService.showSpinner();
      this.windowRef.confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
      if (this.windowRef.confirmationResult) {
        this.verificationCodeSent = true;
        this.spinnerService.hideSpinner();
        this.notificationService.showSuccessMessage
        ('Please enter the Verification code sent to your Mobile', 'Mobile Login');
      }
    } catch (e) {
      this.spinnerService.hideSpinner();
      this.errorHandlerService.handleError(e);
    }
  }

  // Verify sent mobile code
  async verifyCode(event, model) {
    event.preventDefault();
    try {
      this.spinnerService.showSpinner();
      await this.windowRef.confirmationResult.confirm(model.value)
        .then(result => {
          if (result) {
            this.appService.loggedInStatus.next(true);
            this.loggedInUser = result.user;
            this.loadingBarService.stop();
            this.router.navigate(['/registration']);
            this.notificationService.showSuccessMessage('Phone verified successfully!', 'Mobile Verification');
            this.spinnerService.hideSpinner();
          }
        }).catch(e => {
          this.spinnerService.hideSpinner();
          this.errorHandlerService.handleError(e);
        });
    } catch (e) {
      this.errorHandlerService.handleError(e);
      this.spinnerService.hideSpinner();
    }

  }

  // Google SignIn
  async signInWithGoogle() {
    try {

      await this.appService.signInWithGoogle(this.provider)
        .then(result => {
          if (result) {

            this.loadingBarService.stop();
            this.appService.loggedInStatus.next(true);
            this.notificationService.showSuccessMessage('Log in successfull!', 'Google Sign-In');
            this.router.navigate(['/registration']);
          }
        })
        .catch(e => {
          this.errorHandlerService.handleError(e);

          this.router.navigate(['/login']);
        });
    } catch (e) {
      this.errorHandlerService.handleError(e);

    }
  }
}

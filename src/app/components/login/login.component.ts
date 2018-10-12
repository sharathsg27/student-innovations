import {Component, OnInit, HostBinding} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth,} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {UserSignInClass, PhoneSignInClass} from '../../classes/class';
import {WindowService} from '../../utils/services/window/window.service';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';
import {MessageService} from '../../utils/messages/message.service';
import {NotificationService} from '../../utils/notifications/notification.service';
import {ErrorsHandler} from '../../utils/error-handler/error-handler';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  windowRef: any;

  newUserSignIn = new UserSignInClass();
  PhoneSignInClass = new PhoneSignInClass('', null);

  provider = new firebase.auth.GoogleAuthProvider();
  siteToken = environment.phoneSignInSettings.siteToken;

  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private window: WindowService,
              private notificationService: NotificationService,
              private errorHandler: ErrorsHandler,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.windowRef = this.window.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('phone-signIn', {
      'size': 'invisible'
    });
  }


  // Phone Number SignIn
  async sendVerificationCode(event) {
    event.preventDefault();
    const phoneNumber = this.PhoneSignInClass.number;
    const appVerifier = this.windowRef.recaptchaVerifier;

    try {
      this.windowRef.confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
      if (this.windowRef.confirmationResult) {
        this.notificationService.showSuccessMessage('Verification code has been sent to your mobile. Please verify to login.',
          'Mobile Verification');
      }
    } catch (e) {
      console.log(e);
    }
  }

  // Verify Code
  async verifyCode(event, model) {
    event.preventDefault();
    try {
      const result = await this.windowRef.confirmationResult.confirm(model.value);
      if (result) {
        this.notificationService.showSuccessMessage('Phone verified successfully!', 'Mobile Verification');
        this.router.navigate(['/students']);
      }
    } catch (e) {
      this.errorHandler.handleError(e);
    }

  }

  // Email Link SignIn
  sendEmailLink(event, model) {
    event.preventDefault();
    try {
      this.authService.sendEmailLink(model.value).then(result => {
        if (result) {
          this.notificationService.showSuccessMessage('Please click the link sent to your account to confirm & login',
            'Email Verification');
        }
      });
    } catch (e) {
      this.errorHandler.handleError(e);
    }
  }

  // Custom SignIn
  async emailSignIn() {
    if (this.newUserSignIn && this.newUserSignIn.email && this.newUserSignIn.password) {
      try {
        const user = await this.authService.emailSignIn(this.newUserSignIn);
        if (user) {
          this.notificationService.showSuccessMessage('Login Successfull!',
            'Email Login');
          this.router.navigate(['/home']);
        }
      } catch (e) {
        this.errorHandler.handleError(e);
      }
    }
  }

  // Google SignIn
  async signInWithGoogle() {
    try {
      const result = await this.afAuth.auth.signInWithPopup(this.provider);
      if (result) {
        this.notificationService.showSuccessMessage('Log in successfully!', 'Google Sign-In');
        this.router.navigate(['/students']);
      }
    } catch (e) {
      this.errorHandler.handleError(e);
    }
  }

}

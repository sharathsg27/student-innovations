import {Component, OnInit, HostBinding} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth,} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {NewUserSignIn, PhoneSignIn} from '../../classes/class';
import {WindowService} from '../../services/window.service';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  windowRef: any;

  newUserSignIn = new NewUserSignIn();
  PhoneSignIn = new PhoneSignIn('', null);

  provider = new firebase.auth.GoogleAuthProvider();
  siteToken = environment.phoneSignInSettings.siteToken;

  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private window: WindowService,
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
    const phoneNumber = this.PhoneSignIn.number;
    const appVerifier = this.windowRef.recaptchaVerifier;

    try {
      this.windowRef.confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
    } catch (e) {
      console.log(e);
    }
  }

  // Verify Code
  async verifyCode(event, model) {
    event.preventDefault();
    try {
      const user = await this.windowRef.confirmationResult.confirm(model.value);
    } catch (e) {
      console.log(e);
    }

  }

  // Email Link SignIn
  sendEmailLink(event, model) {
    event.preventDefault();
    this.authService.sendEmailLink(model.value);
  }

  // Custom SignIn
  async emailSignIn() {
    if (this.newUserSignIn && this.newUserSignIn.email && this.newUserSignIn.password) {
      try {
        const user = await this.authService.emailSignIn(this.newUserSignIn);
        if (user) {
          this.router.navigate(['/home']);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  // Google SignIn
  async signInWithGoogle() {
    try {
      const result = await this.afAuth.auth.signInWithPopup(this.provider);
      if (result) this.router.navigate(['/students']);
    } catch (e) {
      console.log(e);
    }
  }

}

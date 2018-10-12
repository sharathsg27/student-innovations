import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {environment} from '../../../environments/environment';
import {UserSignInClass} from '../../classes/class';
import {AngularFireAuth} from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import {Router} from '@angular/router';
import {ErrorsHandler} from '../../utils/error-handler/error-handler';
import {e} from '../../../../node_modules/@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private errorHandler: ErrorsHandler) {
  }

  async checkAuth() {
    try {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          return true;
        } else this.router.navigate(['/registration']);
      });
    } catch (e) {
      this.errorHandler.handleError(e);
    }
  }

  async sendEmailLink(value) {
    try {
      await firebase.auth().sendSignInLinkToEmail(value, environment.emailLinkAuthSettings);
      window.localStorage.setItem('emailForSignIn', value);
    } catch (e) {
      this.errorHandler.handleError(e);
    }
  }


  async emailSignUp(credentials: UserSignInClass): Promise<UserCredential> {
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    } catch (e) {
      this.errorHandler.handleError(e);
    }
  }

  async emailSignIn(credentials: UserSignInClass): Promise<UserCredential> {
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    } catch (e) {
      this.errorHandler.handleError(e);
    }
  }
}

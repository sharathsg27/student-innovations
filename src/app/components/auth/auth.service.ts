import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {environment} from '../../../environments/environment';
import {NewUserSignIn} from '../../classes/class';
import {AngularFireAuth} from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private router: Router) {
  }

  async checkAuth() {
    try {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          return true;
        } else this.router.navigate(['/registration']);
      });
    } catch (e) {
      console.log(e);
    }
  }

  async sendEmailLink(value) {
    try {
      await firebase.auth().sendSignInLinkToEmail(value, environment.emailLinkAuthSettings);
      window.localStorage.setItem('emailForSignIn', value);
    } catch (e) {
      console.log(e);
    }
  }


  async emailSignUp(credentials: NewUserSignIn): Promise<UserCredential> {
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    } catch (e) {
      console.log(e);
    }
  }

  async emailSignIn(credentials: NewUserSignIn): Promise<UserCredential> {
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    } catch (e) {
      console.log(e);
    }
  }
}

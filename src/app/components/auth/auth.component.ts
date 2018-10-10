import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  user: Observable<any>;
  email: string;
  emailSent = false;
  errorMessage: string;

  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.user = this.afAuth.authState;

    const url = this.router.url;
    this.confirmSignIn();
    this.authService.checkAuth();
  }

  async confirmSignIn() {
    try {
      if (this.afAuth.auth.isSignInWithEmailLink(window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');

        // If missing email, prompt user for it
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        // Signin user and remove the email localStorage
        const result = await this.afAuth.auth.signInWithEmailLink(email, window.location.href);
        if (result) this.router.navigate(['/students']);
        window.localStorage.removeItem('emailForSignIn');
      } else {
        console.log('-----');
      }
    } catch (err) {
      this.errorMessage = err.message;
    }
  }

}

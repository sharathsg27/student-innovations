import {Injectable} from '@angular/core';
import {UUIDService} from '../utils/services/UUID/uuid.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {ErrorHandlerService} from '../utils/error-handler/error-handler';
import {NotificationService} from '../utils/notifications/notification.service';
import * as firebase from 'firebase';
import {environment} from '../../environments/environment';
import {UserSignInClass} from '../classes/class';
import UserCredential = firebase.auth.UserCredential;
import {Router, RouterStateSnapshot} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Subject} from 'rxjs';
import {AppLoadingBarService} from '../utils/loading-bar/loading-bar.service';
import {promise} from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // Observable string sources
  loggedInStatus = new Subject<boolean>();
  loadingStatus = new Subject<boolean>();
  registrationCompleteStatus = new Subject<boolean>();

  // Observable string streams
  isLoggedIn$ = this.loggedInStatus.asObservable();
  isLoading$ = this.loadingStatus.asObservable();
  isRegistrationComplete$ = this.registrationCompleteStatus.asObservable();

  constructor(private uuidService: UUIDService,
              private router: Router,
              private afAuth: AngularFireAuth,
              private notificationService: NotificationService,
              private errorHandlerService: ErrorHandlerService,
              private loadingBarService: AppLoadingBarService,
              private db: AngularFireDatabase) {
  }

  async checkAuth() {
    return await new Promise((resolve, reject) => {
      try {
        return firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            resolve(user);
          } else reject(false);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  signInWithGoogle(provider) {
    return new Promise((resolve, reject) => {
      try {
        const loggedIn = this.afAuth.auth.signInWithPopup(provider);
        if (loggedIn) {
          resolve(loggedIn);
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  logOut() {
    return new Promise(((resolve, reject) => {
      try {
        const loggedOut = this.afAuth.auth.signOut();
        if (loggedOut) {
          resolve(loggedOut);
        }
      } catch (e) {
        reject(e);
      }
    }));
  }

  async sendEmailLink(value) {
    try {
      await firebase.auth().sendSignInLinkToEmail(value, environment.emailLinkAuthSettings);
      window.localStorage.setItem('emailForSignIn', value);
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }


  async emailSignUp(credentials: UserSignInClass): Promise<UserCredential> {
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }

  async emailSignIn(credentials: UserSignInClass): Promise<UserCredential> {
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }


  /** POST
   *
   * @param api
   * @param data
   */
  createRecord(api: string, data: Object) {
    try {
      this.db.database.ref(api + '/' + this.uuidService.generateUUID).set(data)
        .then((response) => {
          this.loadingStatus.next(false);
          this.notificationService.showSuccessMessage('Record created successfully!');
        })
        .catch((error: Error) => {
          this.loadingStatus.next(false);
          this.notificationService.showErrorMessage(error.message);
        });
    } catch (e) {
      this.loadingStatus.next(false);
      this.errorHandlerService.handleError(e);
    }
  }

  /** GET All
   *
   * @param api
   */
  getAllRecord(api: string) {
    try {
      return this.db.database.ref(api).once('value')
        .then(response => {
          return response.val();
        })
        .catch((error: Error) => {
          this.notificationService.showErrorMessage(error.message);
        });
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }

  // Get a particular record with filter (Key, Value)
  async getRecord(api: string, filters) {
    try {
      return await this.db.database.ref(api)
        .orderByChild(filters['keyFilter'])
        .equalTo(filters['valueFilter'])
        .once('value')
        .then(response => {
          return response.val();
        })
        .catch((error: Error) => {
          this.notificationService.showErrorMessage(error.message);
        });
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }

  convertDate(dateString) {
    let dateVal = new Date(dateString);
    let month_names = ['Jan', 'Feb', 'Mar',
      'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec'];

    let day = dateVal.getDate();
    let month_index = dateVal.getMonth();
    let year = dateVal.getFullYear();
    return '' + day + '-' + month_names[month_index] + '-' + year;
  }

  // Check User has done a registration
  async checkUserHasRegistration(userId: string) {
    if (userId) {
      let filter = {
        'keyFilter': 'userId',
        // @ts-ignore
        'valueFilter': userId
      };
      try {
        let records = await this.getRecord('/registration', filter);
        this.loadingStatus.next(false);
        if (records) {
          this.registrationCompleteStatus.next(true);
          this.router.navigate(['/ideas']);
          return true;
        } else {
          this.registrationCompleteStatus.next(false);
          if (this.router.routerState.snapshot.url === 'home') {
            return true;
          } else {
            this.router.navigate(['/registration']);
            return false;
          }
        }
      } catch (e) {
        this.errorHandlerService.handleError(e);
      }
    }
  }

  // Redirect to a state
  reDirectTo(url: string) {
    this.router.navigate([`/${url}`]);
  }
}

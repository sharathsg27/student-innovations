import {Component, OnInit} from '@angular/core';
import {PhoneSignInClass, SchoolTypeClass, UserRegisterClass} from '../../classes/class';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {AppService} from '../../services/app.service';
import {NotificationService} from '../../utils/notifications/notification.service';
import {MessageService} from '../../utils/messages/message.service';
import {environment} from '../../../environments/environment';
import * as firebase from 'firebase';
import {WindowService} from '../../utils/window/window.service';
import {Router} from '@angular/router';
import {ErrorHandlerService} from '../../utils/error-handler/error-handler';
import {AppLoadingBarService} from '../../utils/loading-bar/loading-bar.service';
import {AppSpinnerService} from '../../utils/spinner/app.spinner.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  // Initializations
  user: Object;
  isLoggedIn: boolean;
  isRegistrationComplete: boolean;
  userRegisterForm;
  formRequiredMessage = new MessageService();
  schoolTypeValues: Array<SchoolTypeClass> = [];
  formValidator = [Validators.required, Validators.min(1)];


  constructor(private fb: FormBuilder,
              private db: AngularFireDatabase,
              private router: Router,
              private appService: AppService,
              private spinnerService: AppSpinnerService,
              private window: WindowService,
              private notificationService: NotificationService,
              private messageService: MessageService,
              private loadingBarService: AppLoadingBarService,
              private errorHandlerService: ErrorHandlerService) {

    appService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    appService.isRegistrationComplete$.subscribe(isRegistrationComplete => this.isRegistrationComplete = isRegistrationComplete);
  }

  ngOnInit() {
    this.checkUser().then(loggedInUser => {
      if (loggedInUser) {
        this.user = loggedInUser;
        this.appService.loggedInStatus.next(true);
        // @ts-ignore
        if (this.user.displayName === 'registered') {
          this.appService.registrationCompleteStatus.next(true);
          this.router.navigate(['/ideas']);
        } else this.appService.registrationCompleteStatus.next(false);
      }
    });
    this.getSchoolTypeValues();
    this.buildUserRegisterForm();
  }

  async checkUser() {
    try {
      return await this.appService.checkAuth();
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }

  // Select Registration type
  selectRegistrationType(event) {
    event.preventDefault();
    if (event.target.value === 'Post') {
      this.userRegisterForm.controls['teacherName'].clearValidators();
      this.userRegisterForm.controls['schoolName'].clearValidators();
      this.userRegisterForm.controls['teacherName'].updateValueAndValidity();
      this.userRegisterForm.controls['schoolName'].updateValueAndValidity();
    } else if (event.target.value === 'Teacher') {
      this.userRegisterForm.controls['teacherName'].setValidators(this.formValidator);
      this.userRegisterForm.controls['schoolName'].setValidators(this.formValidator);
      this.userRegisterForm.controls['teacherName'].updateValueAndValidity();
      this.userRegisterForm.controls['schoolName'].updateValueAndValidity();
    }
  }


  getSchoolTypeValues() {
    let schoolTypeInstance = new SchoolTypeClass();
    for (let key in schoolTypeInstance) {
      if (schoolTypeInstance.hasOwnProperty(key)) this.schoolTypeValues.push(schoolTypeInstance[key]);
    }
  }

  buildUserRegisterForm() {
    this.userRegisterForm = this.fb.group({
      'registerType': ['Teacher', this.formValidator],
      'teacherName': ['', this.formValidator],
      'schoolName': ['', this.formValidator],
      'schoolType': ['', this.formValidator],
      'address': ['', this.formValidator],
      'pinCode': ['', this.formValidator],
      'city': ['', this.formValidator],
      'state': ['', this.formValidator],
    });
  }

  async registerUser(form: UserRegisterClass) {
    try {
      // @ts-ignore
      if (!form.value) {
        return;
      }
      if (this.user) {
        // @ts-ignore
        form.value.userId = this.user.uid;
      }

      // @ts-ignore
      await this.appService.createRecord('/registration', form.value);
      this.updateUserProfile();
      this.appService.registrationCompleteStatus.next(true);
      this.router.navigate(['/ideas']);
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }

  async updateUserProfile() {
    let user = firebase.auth().currentUser;
    await user.updateProfile({
      displayName: 'registered',
      photoURL: ''
    }).then(function () {
      // Update successful.
    }, function (error) {
      // An error happened.
    });
  }

}

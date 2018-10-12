import {Component, OnInit} from '@angular/core';
import {SchoolTypeClass, UserRegisterClass, VerificationTypeClass} from '../classes/class';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {AppRoutingModule} from '../app.routing.module';
import {AppService} from '../services/app.service';
import {NotificationService} from '../utils/notifications/notification.service';
import {MessageService} from '../utils/messages/message.service';
import {AuthService} from '../components/auth/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  // Initializations
  userRegisterForm: FormGroup;
  verificationTypeClass = new VerificationTypeClass();
  types = this.verificationTypeClass.types;
  selectedVerifType = this.verificationTypeClass.email;
  formRequiredMessage = new MessageService();
  schoolTypeValues: Array<SchoolTypeClass> = [];
  formValidator = [Validators.required, Validators.min(1)];
  users$: any[];


  constructor(private fb: FormBuilder,
              private db: AngularFireDatabase,
              private appService: AppService,
              private notificationService: NotificationService,
              private messageService: MessageService,
              private authService: AuthService,
              private appRoute: AppRoutingModule) {
  }

  ngOnInit() {
    this.getRegisteredUsers();
    this.getSchoolTypeValues();
    this.buildUserRegisterForm();
  }

  getSchoolTypeValues() {
    let schoolTypeInstance = new SchoolTypeClass();
    for (let key in schoolTypeInstance) {
      if (schoolTypeInstance.hasOwnProperty(key)) this.schoolTypeValues.push(schoolTypeInstance[key]);
    }
  }

  changeVerificationType(type) {
    switch (type) {
      case this.verificationTypeClass.email:
        this.selectedVerifType = this.verificationTypeClass.email;
        this.userRegisterForm.get('phone').clearValidators();
        this.userRegisterForm.updateValueAndValidity();
        break;
      case this.verificationTypeClass.phone:
        this.selectedVerifType = this.verificationTypeClass.phone;
        this.userRegisterForm.get('email').clearValidators();
        this.userRegisterForm.get('phone').setValidators(this.formValidator);
        this.userRegisterForm.updateValueAndValidity();
        break;
      default:
        this.selectedVerifType = this.verificationTypeClass.email;
        break;
    }
  }

  buildUserRegisterForm() {
    this.userRegisterForm = this.fb.group({
      'teacherName': ['', this.formValidator],
      'schoolName': ['', this.formValidator],
      'schoolType': ['', this.formValidator],
      'userId': ['', this.formValidator],
      'password': ['', this.formValidator],
      'email': ['', [Validators.required, Validators.email]],
      'phone': ['', []],
      'address': ['', this.formValidator],
      'pinCode': ['', this.formValidator],
      'city': ['', this.formValidator],
      'state': ['', this.formValidator],
    });
  }

  sendEmailLink() {
    if (this.userRegisterForm.get('email')) {
      this.authService.sendEmailLink(this.userRegisterForm.get('email').value);
    }
  }

  async registerUser(form: UserRegisterClass) {
    // @ts-ignore
    await this.appService.createRecord(this.appRoute.apiPath.registration, form.value);
  }

  async getRegisteredUsers() {
    this.users$ = await this.appService.getAllRecord(this.appRoute.apiPath.registration);
    console.log(this.users$);
  }

}

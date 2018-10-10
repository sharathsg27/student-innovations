import {Component, OnInit} from '@angular/core';
import {SchoolTypeClass, UserRegisterClass} from '../classes/class';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {AppRoutingModule} from '../app.routing.module';
import {AppService} from '../services/app.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  userRegisterForm: FormGroup;
  schoolTypeValues: Array<SchoolTypeClass> = [];
  formValidator = [Validators.required, Validators.min(1)];


  constructor(private fb: FormBuilder,
              private db: AngularFireDatabase,
              private appService: AppService,
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

  buildUserRegisterForm() {
    this.userRegisterForm = this.fb.group({
      'teacherName': ['', this.formValidator],
      'schoolName': ['', this.formValidator],
      'schoolType': ['', this.formValidator],
      'userId': ['', this.formValidator],
      'password': ['', this.formValidator],
      'email': ['', [Validators.required, Validators.email]],
      'phone': ['', this.formValidator],
      'address': ['', this.formValidator],
      'pinCode': ['', this.formValidator],
      'city': ['', this.formValidator],
      'state': ['', this.formValidator],
    });
  }

  async registerUser(form: UserRegisterClass) {
    // @ts-ignore
    const test = await this.appService.createRecord(this.appRoute.apiPath.registration, form.value);
    console.log(test);
  }

  async getRegisteredUsers() {
    const users = await this.appService.getAllRecord(this.appRoute.apiPath.registration);
    console.log(users);
  }

}

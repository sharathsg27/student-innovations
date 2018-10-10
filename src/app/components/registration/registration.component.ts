import {Component, OnInit} from '@angular/core';
import {SignUpTypeEnum} from '../../enums/enum';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  signUpType = SignUpTypeEnum;
  signUpViewType = SignUpTypeEnum.default;

  constructor() {
  }

  ngOnInit() {
  }

  toggleSignUpType(type) {
    switch (type) {
      case SignUpTypeEnum.default:
        this.signUpViewType = SignUpTypeEnum.default;
        break;
      case SignUpTypeEnum.userRegister:
        this.signUpViewType = SignUpTypeEnum.userRegister;
        break;
      case SignUpTypeEnum.login:
        this.signUpViewType = SignUpTypeEnum.login;
        break;
      default:
        this.signUpViewType = SignUpTypeEnum.default;
        break;
    }
  }

}

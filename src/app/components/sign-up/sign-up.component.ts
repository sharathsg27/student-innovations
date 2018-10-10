import {Component, OnInit} from '@angular/core';
import {NewUserSignIn} from '../../classes/class';
import {AuthService} from '../auth/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppLoadingBarService} from '../../utils/loading-bar/loading-bar.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private appLoadingBarService: AppLoadingBarService,
              private router: Router) {
  }

  ngOnInit() {
    this.buildForm();
  }

  // Build User Form
  buildForm() {
    this.signUpForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        /*Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),*/
        Validators.minLength(6),
        Validators.maxLength(15)
      ]
      ]
    });

    this.signUpForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  onValueChanged(data?: any) {

  }

  // Email SignUp
  async emailSignUp(newUserSignIn: NewUserSignIn) {
    try {
      this.appLoadingBarService.startLoading();
      // @ts-ignore
      const user = await this.authService.emailSignUp(newUserSignIn.value);
      if (user) {
        this.appLoadingBarService.stopLoading();
      }
    } catch (e) {
      console.log(e);
    }
  }

}

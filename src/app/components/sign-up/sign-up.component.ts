import {Component, OnInit} from '@angular/core';
import {UserSignInClass} from '../../classes/class';
import {AuthService} from '../auth/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppLoadingBarService} from '../../utils/loading-bar/loading-bar.service';
import {NotificationService} from '../../utils/notifications/notification.service';
import {MessageService} from '../../utils/messages/message.service';
import {ErrorsHandler} from '../../utils/error-handler/error-handler';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  formRequiredMessage = new MessageService();

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private appLoadingBarService: AppLoadingBarService,
              private notificationService: NotificationService,
              private messages: MessageService,
              private router: Router,
              private errorHandler: ErrorsHandler) {
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
  async emailSignUp(newUserSignIn: UserSignInClass) {
    try {
      this.appLoadingBarService.startLoading();
      // @ts-ignore
      const user = await this.authService.emailSignUp(newUserSignIn.value);
      if (user) {
        this.appLoadingBarService.stopLoading();
        this.notificationService.showSuccessMessage('Sign-Up Successfull!', 'Sign Up');
      }
    } catch (e) {
      this.errorHandler.handleError(e);
    }
  }

}

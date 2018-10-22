import {Component, OnInit} from '@angular/core';
import {UserSignInClass} from '../../classes/class';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppLoadingBarService} from '../../utils/loading-bar/loading-bar.service';
import {NotificationService} from '../../utils/notifications/notification.service';
import {MessageService} from '../../utils/messages/message.service';
import {ErrorHandlerService} from '../../utils/error-handler/error-handler';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm;
  formRequiredMessage = new MessageService();

  constructor(private appService: AppService,
              private fb: FormBuilder,
              private appLoadingBarService: AppLoadingBarService,
              private notificationService: NotificationService,
              private messages: MessageService,
              private router: Router,
              private errorHandlerService: ErrorHandlerService) {
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
      const user = await this.appService.emailSignUp(newUserSignIn.value);
      if (user) {
        this.appLoadingBarService.stopLoading();
        this.notificationService.showSuccessMessage('Sign-Up Successfull!', 'Sign Up');
      }
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }

}

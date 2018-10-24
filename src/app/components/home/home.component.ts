import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppService} from '../../services/app.service';
import {BehaviorSubject} from 'rxjs';
import {ErrorHandlerService} from '../../utils/error-handler/error-handler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private appService: AppService,
              private errorHandlerService: ErrorHandlerService) {
  }

  ngOnInit() {
    this.checkUser().then(loggedInUser => {
      if (loggedInUser) {
        let data = window.localStorage.getItem('registrationComplete');
        if (data) {
          this.appService.registrationCompleteStatus.next(true);
        } else {
          this.appService.registrationCompleteStatus.next(false);
        }
      }
    });
  }

  async checkUser() {
    try {
      return await this.appService.checkAuth();
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }


}

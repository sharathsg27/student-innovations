import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';
import {Router} from '@angular/router';
import {ErrorHandlerService} from '../../utils/error-handler/error-handler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private appService: AppService,
              private router: Router,
              private errorHandlerService: ErrorHandlerService) {
  }

  ngOnInit() {
    /*this.checkUser().then(loggedInUser => {
      // @ts-ignore
      if (loggedInUser && loggedInUser.displayName === 'registered') {
        this.appService.loggedInStatus.next(true);
        this.appService.registrationCompleteStatus.next(true);
      }
    });*/
  }

  async checkUser() {
    try {
      return await this.appService.checkAuth();
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }

}

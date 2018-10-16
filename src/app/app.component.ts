import {Component, OnInit} from '@angular/core';
import {AppService} from './services/app.service';
import {ErrorHandlerService} from './utils/error-handler/error-handler';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private appService: AppService,
              private errorHandlerService: ErrorHandlerService) {
  }

  ngOnInit() {
    this.checkUser();
  }

  async checkUser() {
    try {
      const user = await this.appService.checkAuth();
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }

}

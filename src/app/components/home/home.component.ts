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
  constructor(private router: Router,
              private errorHandlerService: ErrorHandlerService,
              private appService: AppService) {
  }

  ngOnInit() {
    this.checkUser();
  }

  async checkUser() {
    try {
      const user = await this.appService.checkAuth();
      if (user) {
        this.appService.loggedIn = new BehaviorSubject<boolean>(true);
      }
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }

}

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

  constructor() {
  }

  ngOnInit() {
  }


}

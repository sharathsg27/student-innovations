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
  constructor() {
  }

  ngOnInit() {
  }

}

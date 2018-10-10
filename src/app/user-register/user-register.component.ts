import {Component, OnInit} from '@angular/core';
import {SchoolTypeClass} from '../classes/class';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  schoolType: SchoolTypeClass;

  constructor() {
  }

  ngOnInit() {
  }

}

import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit {
  users$: any[];
  loading: boolean;

  settings = {
    columns: {
      teacherName: {
        title: 'Teacher',
        editable: false
      },
      schoolName: {
        title: 'School',
        editable: false
      },
      schoolType: {
        title: 'School Type',
        editable: false
      },
      registerType: {
        title: 'Register Type',
        editable: false
      },
      city: {
        title: 'City / District',
        editable: false,
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    pager: {
      perPage: 20
    },
    noDataMessage: ''
  };

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.getRegisteredUsers();
  }

  async getRegisteredUsers() {
    this.appService.loadingStatus.next(true);
    this.users$ = Object.values(await this.appService.getAllRecord('/registration'));
    this.appService.loadingStatus.next(false);
  }

}

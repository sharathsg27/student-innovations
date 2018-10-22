import {Component, OnInit} from '@angular/core';
import {IdeasService} from '../../../services/ideas.service';
import {AppService} from '../../../services/app.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-list-ideas',
  templateUrl: './list-ideas.component.html',
  styleUrls: ['./list-ideas.component.css']
})

export class ListIdeasComponent implements OnInit {
  loading: boolean;
  ideas$: any[];
  settings = {
    columns: {
      studentName: {
        title: 'Student Name',
      },
      studentClass: {
        title: 'Class'
      },
      studentRollNumber: {
        title: 'Roll Number'
      },
      submittedDate: {
        title: 'Idea Submitted Date'
      }
    },
    /*actions: {
      add: false,
      edit: false,
      delete: false ,
      custom: [
        {
          name: 'View',
          title: '<span class="btn-icon"><i class="material-icons">visibility</i>View </span>'
        }
      ],
      position: 'right'
    },*/
    pager: {
      perPage: 20
    },
    noDataMessage: 'No Idea records found',
    attr: {
      class: 'table'
    }
  };
  loggedInUser = firebase.auth().currentUser.uid;
  filters = {
    keyFilter: 'userId',
    valueFilter: this.loggedInUser
  }

  constructor(private ideasService: IdeasService,
              private appService: AppService) {
  }

  ngOnInit() {
    this.getAllIdeas();
  }

  async getAllIdeas() {
    this.appService.loadingStatus.next(true);
    let data = await this.ideasService.getAllRecord('/ideas', this.filters);
    this.ideas$ = Object.values(data);
    /*for (let idea of this.ideas$){
      idea.submittedDate = this.datePipe.transform(idea.submittedDate, 'dd MMM yyyy');
    }*/
    this.appService.loadingStatus.next(false);
  }

  onCustom(event) {
    console.log(event);
  }

}

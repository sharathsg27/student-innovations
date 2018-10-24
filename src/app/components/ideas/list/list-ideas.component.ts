import {Component, OnInit} from '@angular/core';
import {IdeasService} from '../../../services/ideas.service';
import {AppService} from '../../../services/app.service';
import {ErrorHandlerService} from '../../../utils/error-handler/error-handler';
import {Router} from '@angular/router';


@Component({
  selector: 'app-list-ideas',
  templateUrl: './list-ideas.component.html',
  styleUrls: ['./list-ideas.component.css']
})

export class ListIdeasComponent implements OnInit {
  loading: boolean;
  ideas$: any[];
  loggedInUserId;
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
    actions: {
      add: false,
      edit: false,
      delete: false ,
      custom: [
        {
          name: '',
          title: '<span title="View Idea"><i class="material-icons">visibility</i></span>'
        }
      ],
      position: 'right'
    },
    pager: {
      perPage: 20
    },
    noDataMessage: 'No Idea records found',
    attr: {
      class: 'table'
    }
  };
  filters = {
    keyFilter: 'userId',
    valueFilter: this.loggedInUserId
  };


  constructor(private ideasService: IdeasService,
              private errorHandlerService: ErrorHandlerService,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
    this.checkUser();
  }

  async checkUser() {
    try {
      const user = await this.appService.checkAuth();
      if (user) {
        // @ts-ignore
        this.loggedInUserId = user.uid;
        this.filters.valueFilter = this.loggedInUserId;
        this.getAllIdeas();
      }
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }

  async getAllIdeas() {
    this.appService.loadingStatus.next(true);
    let data = await this.ideasService.getAllRecord('/ideas', this.filters);
    if (data) {
      this.ideas$ = Object.values(data);
      for (let i = 0; i < this.ideas$.length; i++) {
        if (this.ideas$[i].submittedDate) {
          this.ideas$[i].submittedDate = this.appService.convertDate(this.ideas$[i].submittedDate);
        }
      }
    }
    this.appService.loadingStatus.next(false);
  }

  onCustom(event) {
    let ideaId = event.data._id;
    this.router.navigate([`/view-idea/${ideaId}`]);
  }



}

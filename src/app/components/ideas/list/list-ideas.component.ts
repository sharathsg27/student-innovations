import {Component, OnInit, ViewChild} from '@angular/core';
import {IdeasService} from '../../../services/ideas.service';
import {AppService} from '../../../services/app.service';
import {ErrorHandlerService} from '../../../utils/error-handler/error-handler';
import {Router} from '@angular/router';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {AppSpinnerService} from '../../../utils/spinner/app.spinner.service';


@Component({
  selector: 'app-list-ideas',
  templateUrl: './list-ideas.component.html',
  styleUrls: ['./list-ideas.component.css']
})

export class ListIdeasComponent implements OnInit {
  loading: boolean;
  ideas$: any[];
  loggedInUserId;
  selected = [];
  rows = [];
  SelectedIdeaId;
  filters = {
    keyFilter: 'userId',
    valueFilter: this.loggedInUserId
  };

  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private ideasService: IdeasService,
              private errorHandlerService: ErrorHandlerService,
              private appService: AppService,
              private spinnerService: AppSpinnerService,
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
    let data = await this.ideasService.getAllRecord('/ideas', this.filters);
    if (data) {
      this.ideas$ = [...Object.values(data)];
      for (let i = 0; i < this.ideas$.length; i++) {
        if (this.ideas$[i].submittedDate) {
          this.ideas$[i].submittedDate = this.appService.convertDate(this.ideas$[i].submittedDate);
        }
      }
      this.rows = this.ideas$;
    }
  }

  onCustom({selected}) {
    this.SelectedIdeaId = selected[0]['_id'];
  }

  goToPage() {
    if (this.SelectedIdeaId) {
      this.router.navigate([`/view-idea/${this.SelectedIdeaId}`]);
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.ideas$.filter(function (idea) {
      return idea.studentName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }


}

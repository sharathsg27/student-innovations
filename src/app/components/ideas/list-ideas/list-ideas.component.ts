import {Component, OnInit} from '@angular/core';
import {IdeasService} from '../../../services/ideas.service';

@Component({
  selector: 'app-list-ideas',
  templateUrl: './list-ideas.component.html',
  styleUrls: ['./list-ideas.component.css']
})

export class ListIdeasComponent implements OnInit {
  ideas$: any[];

  constructor(private ideasService: IdeasService) {
  }

  ngOnInit() {
    this.getAllIdeas();
  }

  async getAllIdeas() {
    this.ideas$ = await this.ideasService.getAllRecord('/ideas');
  }

}

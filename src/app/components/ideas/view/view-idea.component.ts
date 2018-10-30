import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../services/app.service';
import {ErrorHandlerService} from '../../../utils/error-handler/error-handler';
import {IdeasService} from '../../../services/ideas.service';
import {NotificationService} from '../../../utils/notifications/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as firebase from 'firebase';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-view-idea',
  templateUrl: './view-idea.component.html',
  styleUrls: ['./view-idea.component.css'],
  providers: [NgbCarouselConfig]
})
export class ViewIdeaComponent implements OnInit {
  ideaForm: FormGroup;
  loggedInUserId;
  ideaId;
  ideaData = {
    studentName: '',
    studentClass: '',
    studentSection: '',
    studentRollNumber: '',
    idea: '',
  };
  videoLink: string;
  videoUrl: SafeResourceUrl;
  photos = [];
  storage = firebase.storage();
  images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  constructor(private appService: AppService,
              private errorHandlerService: ErrorHandlerService,
              private ideaService: IdeasService,
              private notificationService: NotificationService,
              private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private config: NgbCarouselConfig,
              private sanitizer: DomSanitizer) {
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.ideaId = params.get('id');
      });
    this.checkUser();
  }

  async checkUser() {
    try {
      const user = await this.appService.checkAuth();
      if (user) {
        // @ts-ignore
        this.loggedInUserId = user;
        this.getIdeaData();
      }
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }

  async getIdeaData() {
    if (this.loggedInUserId && this.ideaId) {
      let filter = {
        'keyFilter': '_id',
        'valueFilter': this.ideaId
      };
      let data = await this.appService.getRecord('/ideas', filter);
      if (data) {
        data = (Object.values(data))[0];
        this.ideaData.studentName = data.studentName;
        this.ideaData.studentClass = data.studentClass;
        this.ideaData.studentSection = data.studentSection || '';
        this.ideaData.studentRollNumber = data.studentRollNumber;
        this.ideaData.idea = data.idea;
        this.videoLink = data.videoLink || '';
        this.videoLink = this.videoLink.replace('watch?v=', 'embed/');

        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoLink);
        if (data.photos) {
          this.photos = await this.getPhotos(data.photos);
        }
      } else {
        this.notificationService.showErrorMessage('Idea not found, Please try again');
        /*this.router.navigate(['/ideas']);*/
      }
    }
  }

  /* indexChanged(index) {
     console.log(index);
   }*/

  async getPhotos(photos) {
    let photosArray = [];
    for (let eachPhotoData of photos) {
      let pathReference = await this.storage.ref(eachPhotoData.path);
      try {
        let photo = await pathReference.getDownloadURL();
        photosArray.push(photo);
      } catch (e) {
        this.notificationService.showWarningMessage('Some of the images are not loaded');
      }


    }
    return photosArray;
  }


}

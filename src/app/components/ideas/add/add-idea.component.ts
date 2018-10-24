import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../utils/messages/message.service';
import {IdeaClass} from '../../../classes/class';
import {IdeasService} from '../../../services/ideas.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {map} from 'rxjs/operators';
import {NotificationService} from '../../../utils/notifications/notification.service';
import {Router} from '@angular/router';
import {AppService} from '../../../services/app.service';
import {ErrorHandlerService} from '../../../utils/error-handler/error-handler';

@Component({
  selector: 'app-add-idea',
  templateUrl: './add-idea.component.html',
  styleUrls: ['./add-idea.component.css']
})
export class AddIdeaComponent implements OnInit {
  ideaForm;
  loggedInUserId;
  uploadedPhotos = [];
  formRequiredMessage = new MessageService();
  uploadProgress;
  videoLink: any = [];
  private uploadPath = '/uploads/photos';

  constructor(private appService: AppService,
              private fb: FormBuilder,
              private router: Router,
              private messages: MessageService,
              private ideasService: IdeasService,
              private afStorage: AngularFireStorage,
              private notificationService: NotificationService,
              private errorHandlerService: ErrorHandlerService) {
  }

  ngOnInit() {
    this.checkUser();
    this.buildForm();
  }


  // Build Idea Form
  buildForm() {
    this.ideaForm = this.fb.group({
      'studentName': ['', [
        Validators.required,
        Validators.minLength(3)
      ]
      ],
      'studentClass': ['', [
        Validators.required,
        Validators.pattern('^\\d+$'),
        Validators.min(1),
        Validators.max(10)
      ]
      ],
      'studentSection': ['', []],
      'studentRollNumber': ['', [Validators.required]],
      'idea': ['', [
        Validators.required
      ]
      ],
      'photos': [this.uploadedPhotos, []],
      'videoLink': [this.videoLink, [
        Validators.pattern('^http(s)?:\\/\\/(www\\.)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$'),
      ]
      ]
    });
  }

  async checkUser() {
    try {
      const user = await this.appService.checkAuth();
      if (user) {
        // @ts-ignore
        this.loggedInUserId = user.uid;
      }
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }
  async addIdea(form: IdeaClass) {// Get a key for a new Post.
    // @ts-ignore
    if (!form.value) return;
    // @ts-ignore
    if (this.loggedInUserId && this.loggedInUserId) form.value.userId = this.loggedInUserId;
    // @ts-ignore
    form.value.submittedDate = new Date().toString();
    // @ts-ignore
    await this.ideasService.createRecord('/ideas', form.value);
    this.notificationService.showSuccessMessage('Idea added successfully');
    this.router.navigate(['/ideas']);
  }

  uploadFile(event) {
    let ref;
    let task;

    for (let i = 0; i < event.target.files.length; i++) {
      let uploadedFileType = event.target.files[i].type;
      uploadedFileType = uploadedFileType.split('/')[1];
      const randomId = Math.random().toString(36).substring(2);
      let filePath = `uploads/photos/${randomId}.${uploadedFileType}`;
      ref = this.afStorage.ref(filePath);
      task = ref.put(event.target.files[i]);
      // @ts-ignore
      this.uploadProgress = task.snapshotChanges().pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
      this.uploadedPhotos.push({
        'name': event.target.files[i].name,
        'path': task.task.location_.path
      });
    }
    this.notificationService.showSuccessMessage('Photo uploaded successfully');
  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../utils/messages/message.service';
import {IdeaClass} from '../../../classes/class';
import {IdeasService} from '../../../services/ideas.service';
import {AngularFireStorage} from '@angular/fire/storage';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';
import {NotificationService} from '../../../utils/notifications/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-idea',
  templateUrl: './add-idea.component.html',
  styleUrls: ['./add-idea.component.css']
})
export class AddIdeaComponent implements OnInit {
  ideaForm: FormGroup;
  loggedInUser = firebase.auth().currentUser;
  uploadedPhotos = [];
  formRequiredMessage = new MessageService();
  uploadProgress;
  private uploadPath = '/uploads/photos';

  constructor(private fb: FormBuilder,
              private router: Router,
              private messages: MessageService,
              private ideasService: IdeasService,
              private afStorage: AngularFireStorage,
              private notificationService: NotificationService) {
    console.log(this.loggedInUser);
  }

  ngOnInit() {
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
      ]
      ],
      'studentSection': ['', []],
      'studentRollNumber': ['', []],
      'idea': ['', [
        Validators.required
      ]
      ],
      'photos': [this.uploadedPhotos, []],
      'videoLinks': ['', [
        Validators.pattern('^http(s)?:\\/\\/(www\\.)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$'),
      ]
      ]
    });
  }

  async addIdea(form: IdeaClass) {
    // @ts-ignore
    await this.ideasService.createRecord('/ideas', form.value);
    this.notificationService.showSuccessMessage('Idea added successfully');
    this.router.navigate(['/ideas']);
  }

  uploadFile(event) {
    let ref;
    let task;

    for (let i = 0; i < event.target.files.length; i++) {
      const randomId = Math.random().toString(36).substring(2);
      let filePath = `uploads/photos/${randomId}`;
      ref = this.afStorage.ref(filePath);
      task = ref.put(event.target.files[i]);
      console.log(task.task.location_.path);
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

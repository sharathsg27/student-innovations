import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {UUIDService} from '../utils/UUID/uuid.service';
import {NotificationService} from '../utils/notifications/notification.service';
import {ErrorHandlerService} from '../utils/error-handler/error-handler';
import {AppSpinnerService} from '../utils/spinner/app.spinner.service';

@Injectable({
  providedIn: 'root'
})
export class IdeasService {

  constructor(private db: AngularFireDatabase,
              private uuidService: UUIDService,
              private spinnerService: AppSpinnerService,
              private notificationService: NotificationService,
              private errorHandlerService: ErrorHandlerService) {

  }

  // List logged in User relevant ideas
  async getAllRecord(api: string, filters) {
    try {
      this.spinnerService.showSpinner();
      return await this.db.database.ref(api)
        .orderByChild(filters['keyFilter'])
        .equalTo(filters['valueFilter'])
        .once('value')
        .then(response => {
          this.spinnerService.hideSpinner();
          return response.val();
        })
        .catch((error: Error) => {
          this.notificationService.showErrorMessage(error.message);
        });
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }

  // Create Idea record
  async createRecord(api: string, data: Object) {
    let newID = this.uuidService.generateUUID;
    data['_id'] = newID;
    try {
      this.spinnerService.showSpinner();
      await this.db.database.ref(api + '/' + newID).set(data)
        .then((response) => {
          this.spinnerService.hideSpinner();
        })
        .catch((error: Error) => {
          this.notificationService.showErrorMessage(error.message);
        });
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }

}

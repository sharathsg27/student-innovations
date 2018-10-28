import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {UUIDService} from '../utils/services/UUID/uuid.service';
import {NotificationService} from '../utils/notifications/notification.service';
import {ErrorHandlerService} from '../utils/error-handler/error-handler';

@Injectable({
  providedIn: 'root'
})
export class IdeasService {

  constructor(private db: AngularFireDatabase,
              private uuidService: UUIDService,
              private notificationService: NotificationService,
              private errorHandlerService: ErrorHandlerService) {

  }

  // List logged in User relevant ideas
  async getAllRecord(api: string, filters) {
    try {
      return await this.db.database.ref(api)
        .orderByChild(filters['keyFilter'])
        .equalTo(filters['valueFilter'])
        .once('value')
        .then(response => {
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
      await this.db.database.ref(api + '/' + newID).set(data)
        .then((response) => {
          console.log(response);
        })
        .catch((error: Error) => {
          this.notificationService.showErrorMessage(error.message);
        });
    } catch (e) {
      this.errorHandlerService.handleError(e);
    }
  }

}

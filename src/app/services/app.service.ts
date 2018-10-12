import {Injectable} from '@angular/core';
import {AppRoutingModule} from '../app.routing.module';
import {UUIDService} from '../utils/services/UUID/uuid.service';
import {AngularFireDatabase, SnapshotAction} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {ErrorsHandler} from '../utils/error-handler/error-handler';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private appRoute: AppRoutingModule,
              private uuidService: UUIDService,
              private db: AngularFireDatabase) {
  }


  /** POST
   *
   * @param api
   * @param data
   */
  async createRecord(api: string, data: Object) {
    try {
      await this.db.database.ref(api + '/' + this.uuidService.generateUUID).set(data)
        .then((response) => {
          console.log(response);
        })
        .catch((error: Error) => {
          return error.message;
        });
    } catch (e) {
      console.log(e);
    }
  }

  /** GET All
   *
   * @param api
   */
  async getAllRecord(api: string) {
    try {
      return await this.db.database.ref(api).once('value')
        .then(response => {
          return response.val();
        })
        .catch((error: Error) => {
          return error.message;
        });
    } catch (e) {
      return e;
    }
  }
}

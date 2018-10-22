import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {UUIDService} from '../utils/services/UUID/uuid.service';

@Injectable({
  providedIn: 'root'
})
export class IdeasService {

  constructor(private db: AngularFireDatabase,
              private uuidService: UUIDService) {

  }

  /*list ideas*/
  async getAllRecord(api: string, filters) {
    try {
      return await this.db.database.ref(api)
      /*.orderByChild(filters['keyFilter'])
      .equalTo(filters['valueFilter'])*/
        .once('value')
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

  /*create idea*/
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

}

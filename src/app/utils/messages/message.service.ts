import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  constructor() {
  }

  getFormRequiredMessage(field: string): string {
    return `${field} is required!`;
  }
}


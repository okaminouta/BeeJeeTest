import {EventEmitter, Injectable} from '@angular/core';
import {RequestService} from './request.service';

@Injectable()
export class DataProviderService {
  isLogin = new EventEmitter<boolean>();
  isAmin = false;
  constructor(private request: RequestService) {
  }


}

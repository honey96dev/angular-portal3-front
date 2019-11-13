import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {apis} from '@core/apis';

@Injectable({providedIn: 'root'})
export class MyaccountService {
  constructor(private http: HttpClient) {
  }

  load(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.myaccount.load}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  save(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.myaccount.save}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  changePassword(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.myaccount.changePassword}`, params)
      .pipe(map(res => {
        return res;
      }));
  }
}

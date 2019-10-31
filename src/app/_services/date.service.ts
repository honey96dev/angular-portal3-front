import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {apis} from '@core/apis';
import {User} from '@app/_models';
import consts from '@core/consts';

@Injectable({providedIn: 'root'})
export class DateService {
  constructor(private http: HttpClient) {
  }

  today(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.date.today}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  year(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.date.year}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  month(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.date.month}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  date(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.date.date}`, params)
      .pipe(map(res => {
        return res;
      }));
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {apis} from '@core/apis';

@Injectable({providedIn: 'root'})
export class ContactUsDataService {
  constructor(private http: HttpClient) {
  }

  post(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.contactUs.post}`, params)
      .pipe(map(res => {
        return res;
      }));
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {apis} from '@core/apis';

@Injectable({providedIn: 'root'})
export class EventsDataService {
  constructor(private http: HttpClient) {
  }

  list(params) {
    return this.http.post<any>(`${environment.assetsApiBaseUrl}${apis.common.events.list}`, params)
      .pipe(map(res => {
        return res;
      }));
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {apis} from '@core/apis';

@Injectable({providedIn: 'root'})
export class OurClientsDataService {
  constructor(private http: HttpClient) {
  }

  list(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.ourClients.list}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  get(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.ourClients.get}`, params)
      .pipe(map(res => {
        return res;
      }));
  }
}

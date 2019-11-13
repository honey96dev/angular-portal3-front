import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {apis} from '@core/apis';

@Injectable({providedIn: 'root'})
export class CoursesDataService {
  defaultRow: any;

  editableRow: any;

  constructor(private http: HttpClient) {
  }

  list(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.courses.list}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  get(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.courses.get}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  join(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.courses.join}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  setEditableRow(params: any) {
    this.editableRow = params;
  }

  editableRowValue(): any {
    if (this.editableRow && this.editableRow['id']) {
      return this.editableRow;
    } else {
      return this.defaultRow;
    }
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {apis} from '@core/apis';

@Injectable({providedIn: 'root'})
export class PrevSponsorsDataService {
  defaultRow: any;

  editableRow: any;

  constructor(private http: HttpClient) {
  }

  list(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.prevSponsors.list}`, params)
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

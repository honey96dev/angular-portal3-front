import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {apis} from '@core/apis';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AboutUsDataService {
  constructor(private http: HttpClient) {
  }

  load(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.aboutUs.load}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  getBrochure(params): Observable<any>{
    return this.http.get(params['url'], { responseType: 'blob' }).pipe(map(res => {
      this.downloadFile(params['name'], res);
    }));
  }


  downloadFile(filename, data: any) {
    // let blob = new Blob([data], { type: type});
    // let url = window.URL.createObjectURL(data);
    // let pwa = window.open(url);
    // if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
    //   alert( 'Please disable your Pop-up blocker and try again.');
    // }

    let url = window.URL.createObjectURL(data);
    const element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DownloaderService {
  constructor(private http: HttpClient) {}

  downloadFile(url): Observable<any>{
    return this.http.get(url, { responseType: 'arraybuffer' });
  }
}

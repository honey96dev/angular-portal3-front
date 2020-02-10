import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {apis} from '@core/apis';
import {User} from '@app/_models';
import consts from '@core/consts';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem(consts.currentUser)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  signIn(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.auth.signIn}`, params)
      .pipe(map(res => {
        if (res.result == consts.success) {
          sessionStorage.setItem(consts.currentUser, JSON.stringify(res.data));
          this.currentUserSubject.next(res.data);
        }

        return res;
      }));
  }

  signUp(payload: object) {
    return this.http.post<any>(`${environment.apiUrl}${apis.auth.signUp}`, payload)
      .pipe(map(res => {
        return res;
      }));
  }

  signOut() {
    // remove user from local storage to log user out
    sessionStorage.removeItem(consts.currentUser);
    this.currentUserSubject.next(null);
  }

  sendForgotPasswordMail(payload: object) {
    return this.http.post<any>(`${environment.apiUrl}${apis.auth.sendForgotPasswordMail}`, payload)
      .pipe(map(res => {
        return res;
      }));
  }

  validateToken(payload: object) {
    return this.http.post<any>(`${environment.apiUrl}${apis.auth.validateToken}`, payload)
      .pipe(map(res => {
        return res;
      }));
  }

  resetPassword(payload: object) {
    return this.http.post<any>(`${environment.apiUrl}${apis.auth.resetPassword}`, payload)
      .pipe(map(res => {
        return res;
      }));
  }

  changeCurrentUserValue(params) {
    let currentUser = this.currentUserValue;
    currentUser = Object.assign({}, currentUser, params);
    sessionStorage.setItem(consts.currentUser, JSON.stringify(currentUser));
    this.currentUserSubject.next(currentUser);
  }
}

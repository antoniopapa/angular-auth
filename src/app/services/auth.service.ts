import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static authEmitter = new EventEmitter<boolean>();

  accessToken = '';

  constructor(private http: HttpClient) {
  }

  register(body: any) {
    return this.http.post(`${environment.api}/register`, body);
  }

  login(body: any) {
    return this.http.post(`${environment.api}/login`, body);
  }

  authenticatorLogin(body: any) {
    return this.http.post(`${environment.api}/two-factor`, body, {withCredentials: true});
  }

  googleLogin(body: any) {
    return this.http.post(`${environment.api}/google-auth`, body, {withCredentials: true});
  }

  user() {
    return this.http.get(`${environment.api}/user`);
  }

  refresh() {
    return this.http.post(`${environment.api}/refresh`, {}, {withCredentials: true});
  }

  logout() {
    return this.http.post(`${environment.api}/logout`, {}, {withCredentials: true});
  }
}

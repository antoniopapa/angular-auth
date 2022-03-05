import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ForgotService {
  constructor(private http: HttpClient) {
  }

  forgot(body: any) {
    return this.http.post(`${environment.api}/forgot`, body);
  }

  reset(body: any) {
    return this.http.post(`${environment.api}/reset`, body);
  }
}

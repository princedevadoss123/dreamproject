import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ChangePwdService {

  constructor(
    private http: HttpClient
  ) { }

  dataPreperation(content) {
    let body = new URLSearchParams();
    for( let key in content) {
      if(content.hasOwnProperty(key)) {
        body.set(key, content[key]);
      }
    }
    return body;
  }

  requestPwd(content) {
    let bodyContent = this.dataPreperation(content);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post('/user/request/resetpassword', bodyContent.toString(), options );
  }

  successResetPwd(content) {
    let bodyContent = this.dataPreperation(content);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post('/user/success/resetpassword', bodyContent.toString(), options );
  }

}

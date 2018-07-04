import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthServiceService {

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

  register(content) {
    let bodyContent = this.dataPreperation(content);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post('/user/signup', bodyContent.toString(), options );
  }

  login(content) {
    let bodyContent = this.dataPreperation(content);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post('/auth/login', bodyContent.toString(), options );
  }
}

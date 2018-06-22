import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthServiceService {

  constructor(
    private http: HttpClient
  ) { }

  register(content) {
    let body = new URLSearchParams();
    body.set('email', content.email);
    body.set('password', content.password);
    body.set('contact', content.contact);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post('/user/signup', body.toString(), options );
  }
}

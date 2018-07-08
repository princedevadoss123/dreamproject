import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  user() {
    return this.http.get('/user');
  }

  logout() {
    return this.http.get('/logout');
  }
}

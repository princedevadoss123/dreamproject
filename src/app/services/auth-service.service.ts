import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthServiceService {

  constructor(
    private http: HttpClient
  ) { }

  googleOAuth() {
    return this.http.get("");
  }
}

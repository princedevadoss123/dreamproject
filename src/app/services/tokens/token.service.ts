import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor() { }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

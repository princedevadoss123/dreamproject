import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class FunctionalityService {

  constructor(
    private http: HttpClient
  ) { }

  basicUrl: string = "localhost:3000/";

  addition(num1, num2) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.get('/add?num1=' + num1 + '&num2=' + num2, options);
  }

  subtraction(num1, num2) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.get('/subtract?num1=' + num1 + '&num2=' + num2, options );
  }

  multiplication(num1, num2) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.get('/multiply?num1=' + num1 + '&num2=' + num2, options );
  }

}

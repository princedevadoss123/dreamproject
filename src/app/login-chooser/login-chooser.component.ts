import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ValidationService } from '../services/validation/validation.service';

@Component({
  selector: 'app-login-chooser',
  templateUrl: './login-chooser.component.html',
  styleUrls: ['./login-chooser.component.css']
})
export class LoginChooserComponent implements OnInit {
  model: any = {};
  emailValidator: boolean = true;
  passwordValidator:boolean = true;
  intialModelCheck:boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private validator: ValidationService
  ) { }

  ngOnInit() {
  }

  passwordChecker() {
    console.log(this.intialModelCheck);
    if(this.intialModelCheck) {
      this.validator.passwordValidation(this.model.password) ? this.passwordValidator = true : this.passwordValidator = false;
    } 
  }

  emailChecker() {
    if(this.intialModelCheck) {
      this.validator.emailValidation(this.model.username) ? this.emailValidator = true : this.emailValidator = false;
    }
  }

  showPassword() {
    var element = this.document.getElementsByName('password');
    if(this.model.logincheck) {
      element[0].setAttribute('type', 'text');
    }
    else {
      element[0].setAttribute('type', 'password');
    }
  }

  login() {
    this.intialModelCheck = true;
    this.emailChecker();
    this.passwordChecker();
  }

  oauthLogin(authType) {
    this.document.location.href = '/auth/' + authType;
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ValidationService } from '../services/validation/validation.service';
import {AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/tokens/token.service';
import { ShowPasswordService } from '../services/show-password/show-password.service';

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
    private validator: ValidationService,
    private authenticator: AuthServiceService,
    private router: Router,
    private tokenizer: TokenService,
    private showPasswd: ShowPasswordService
  ) { }

  ngOnInit() {
    console.log(this.tokenizer.getToken());
    if(this.tokenizer.getToken()) {
      this.router.navigate(['home']);
    }
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
    var password = this.document.getElementsByName('password');
    this.showPasswd.showPassword(this.model.logincheck,password,undefined);
  }

  login() {
    this.intialModelCheck = true;
    this.emailChecker();
    this.passwordChecker();
    if(this.emailValidator && this.passwordValidator) {
      var loginData = {
        username: this.model.username,
        password: this.model.password
      };
      this.authenticator.login(loginData)
        .subscribe(
          res => {
            if(res['token']) {
              this.tokenizer.setToken(res['token']);
              this.router.navigate(['/home']);
            }
            else {
              alert(res['message']);
            }
          },
          err => {
            this.router.navigate(['']);
          }
        );
    }
  }

  oauthLogin(authType) {
    this.document.location.href = '/auth/' + authType;
  }
}

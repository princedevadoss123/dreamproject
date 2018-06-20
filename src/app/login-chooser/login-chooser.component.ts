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
  constructor(
    @Inject(DOCUMENT) private document: any,
    private validator: ValidationService
  ) { }

  ngOnInit() {
  }

  login() {
    this.validator.emailValidation ? this.emailValidator = false : this.emailValidator = true;
  }

  oauthLogin(authType) {
    this.document.location.href = '/auth/' + authType;
  }
}

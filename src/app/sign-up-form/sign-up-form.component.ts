import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ValidationService } from '../services/validation/validation.service';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { ShowPasswordService } from '../services/show-password/show-password.service';
@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  model: any = {};
  emailValidator: boolean = true;
  passwordValidator:boolean = true;
  confPasswordValidator:boolean = true;
  contactValidator:boolean = true;
  intialModelCheck:boolean = false;
  
  constructor(
    @Inject(DOCUMENT) private document: any,
  private validator: ValidationService,
  private authenticator: AuthServiceService,
  private router: Router,
  private showPasswd: ShowPasswordService) { }

  ngOnInit() {
  }

  passwordChecker() {
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
    var confPassword = this.document.getElementsByName('confPassword');
    this.showPasswd.showPassword(this.model.registercheck,password,confPassword);
  }

  confPasswordChecker() {
    if(this.intialModelCheck) {
      this.validator.confirmPasswordValidation(this.model.password, this.model.confPassword) ? this.confPasswordValidator =true : this.confPasswordValidator = false;
    }
  }

  contactChecker() {
    if(this.intialModelCheck) {
      this.validator.contactValidation(this.model.contact) ? this.contactValidator =true : this.contactValidator = false;
    }
  }

  register() {
    this.intialModelCheck = true;
    this.emailChecker();
    this.passwordChecker();
    this.confPasswordChecker();
    this.contactChecker();
    if(this.emailValidator && this.passwordValidator && this.contactValidator && this.confPasswordValidator) {
      var registrationData = {
        email: this.model.username,
        password: this.model.password,
        contact: this.model.contact
      };
      this.authenticator.register(registrationData)
        .subscribe(
          res => {
            if(res['error']) {
              alert(res['message']);
            }
            else {
              alert(res['message']);
              this.router.navigate(['/']);
            }
          },
          err => {
            alert(err);
          }
        );
    }
  }
}

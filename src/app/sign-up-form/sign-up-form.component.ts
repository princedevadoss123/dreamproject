import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../services/validation/validation.service';

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
  
  constructor(private validator: ValidationService) { }

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
  }
}

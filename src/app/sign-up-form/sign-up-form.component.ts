import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  private registrationForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;
  private email: FormControl;
  private username: FormControl;
  private password: FormControl;

  constructor() { }

  ngOnInit() {
    this.initFormControls();
    this.initForm();
  }

  public initFormControls() {
    this.firstName = new FormControl( "", Validators.required);
    this.lastName = new FormControl( "", Validators.required);
    //check if it already exists in Db
    this.email = new FormControl( "", Validators.compose([
			Validators.required,
			Validators.pattern("[^ @]*@[^ @]*")
    ]));
    //check if it already exists in DB
    this.username = new FormControl( "", Validators.required);
    //Password Strength
    this.password = new FormControl( "", Validators.required);
  }

  public initForm() {
    this.registrationForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      password: this.password
    });
  }

  registerUser(event) {
    console.log(event);
  }
}

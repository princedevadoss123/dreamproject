import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-chooser',
  templateUrl: './login-chooser.component.html',
  styleUrls: ['./login-chooser.component.css']
})
export class LoginChooserComponent implements OnInit {
  model: any = {};
  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log("hello");
  }

}

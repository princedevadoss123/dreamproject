import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-login-chooser',
  templateUrl: './login-chooser.component.html',
  styleUrls: ['./login-chooser.component.css']
})
export class LoginChooserComponent implements OnInit {
  model: any = {};
  constructor(
    @Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit() {
  }

  login() {
    console.log("hello");
  }

  oauthLogin(authType) {
    this.document.location.href = '/auth/' + authType;
  }
}

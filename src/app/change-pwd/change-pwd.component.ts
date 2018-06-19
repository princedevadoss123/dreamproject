import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit {
  private model: any = {};
  viewSelector: string;
  innerAreaHeight: string;
  innerAreaTop: string;
  sendButtonHeight: string;
  sendButtonTop: string;
  buttonText: string;
  title: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.viewSelector = this.route.snapshot.queryParams['mode'];
    if(this.viewSelector === 'request') {
      this.innerAreaHeight = '30%';
      this.innerAreaTop = '35%';
      this.sendButtonHeight = '30%';
      this.title = 'Enter Email Here';
      this.buttonText = 'Send';
    }
    else {
      this.innerAreaHeight = '50%';
      this.innerAreaTop = '25%';
      this.sendButtonHeight = '20%';
      this.title = 'Change Password';
      this.buttonText = 'Submit';
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangePwdService } from '../services/change-pwd/change-pwd.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit {
  private model: any = {};
  viewSelector: any;
  viewType: string;
  innerAreaHeight: string;
  innerAreaTop: string;
  sendButtonHeight: string;
  sendButtonTop: string;
  buttonText: string;
  title: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pwdService: ChangePwdService
  ) { }

  ngOnInit() {
    this.viewSelector = this.route
      .queryParams
        .subscribe(params => {
          this.viewType = params['mode'];
          if(this.viewType === 'request') {
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
    });
  }

  ngOnDestroy() {
    this.viewSelector.unsubscribe();
  }

  requestNewPwd() {

    var emailJson = {
      email: this.model.username
    };

      this.pwdService.requestPwd(emailJson).subscribe(
        res => {
          if(res === 'SUCCESS') {
            window.alert("Mail sent to reset Password!!");
          } else {
            window.alert("User ID doesn't exist");
          }
        },
        err => {
          console.log("Error in requesting new Password");
        }
      );
    }
  
}
import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../services/tokens/token.service';
import { FunctionalityService } from '../services/functionality/functionality.service'; 
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-main-index',
  templateUrl: './main-index.component.html',
  styleUrls: ['./main-index.component.css']
})
export class MainIndexComponent implements OnInit, AfterViewInit {
  time:String;
  number1: number;
  number2: number;
  result: number;
  @Output() mainIndexLoaded: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private tokenizer: TokenService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private functionality: FunctionalityService,
    private router: Router) {
      activatedRoute.queryParams.subscribe(
        params => {
          if(params['token']) {
            tokenizer.setToken(params['token']);
            this.router.navigate(['home']);
          }
        }
      )
    }


  ngOnInit() {   
    setInterval(function(){ this.time = new Date().toLocaleTimeString();
      //console.log("hell yeah "+this.time );
    }.bind(this), 1000);
    console.log(this.tokenizer.getToken());
  }

  ngAfterViewInit() {
    this.mainIndexLoaded.emit(true);
  }

  add() {
    this.functionality.addition(this.number1, this.number2).subscribe(
      res => {
        if(res) {
            console.log(res);
        }
        else {
          console.log(res);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  sub() {
    this.functionality.subtraction(this.number1, this.number2).subscribe(
      res => {
        if(res) {
            console.log(res);
        }
        else {
          console.log(res);
        }
      },
      err => {
        console.log(err);
      }
    );;
  }

  mul() {
    this.functionality.multiplication(this.number1, this.number2).subscribe(
      res => {
        if(res) {
            console.log(res);
        }
        else {
          console.log(res);
        }
      },
      err => {
        console.log(err);
      }
    );;
  }

}

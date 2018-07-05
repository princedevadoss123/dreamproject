import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../services/tokens/token.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-main-index',
  templateUrl: './main-index.component.html',
  styleUrls: ['./main-index.component.css']
})
export class MainIndexComponent implements OnInit {
  constructor(
    private tokenizer: TokenService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
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
    console.log(this.tokenizer.getToken());
    if(this.tokenizer.getToken()) {
      this.userService.user()
        .subscribe((data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        });
    }
    else {
      this.router.navigate(['']);
    }
  }

}

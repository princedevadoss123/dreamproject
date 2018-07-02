import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../services/tokens/token.service';

@Component({
  selector: 'app-main-index',
  templateUrl: './main-index.component.html',
  styleUrls: ['./main-index.component.css']
})
export class MainIndexComponent implements OnInit {

  constructor(
    private tokenizer: TokenService,
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
    if(this.tokenizer.getToken() !== 'undefined') {
    }
    else {
      this.router.navigate(['']);
    }
  }

}

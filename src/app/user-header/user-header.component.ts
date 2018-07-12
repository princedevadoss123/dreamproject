import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/tokens/token.service';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  private user: string;
  constructor(
    private tokenizer: TokenService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.tokenizer.getToken()) {
      this.userService.user()
        .subscribe((data) => {
          localStorage.setItem('user', data['email']);
          this.user = data['email'];
        },
        (err) => {
          console.log(err);
        });
    }
    else {
      this.router.navigate(['']);
    }
  }

  logout() {
    this.userService.logout()
      .subscribe( 
        data => {
          this.tokenizer.removeToken();
          localStorage.removeItem('user');
          this.router.navigate(['']);
        }
      )
  }

}

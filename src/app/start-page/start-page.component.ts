import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  private urlString: string;
  constructor (
    private router: Router) {
    }

  ngOnInit() {
  }

  moveToLoginPage() {
    this.urlString = '/login-chooser';
    this.router.navigate([this.urlString]);
  }

  moveToSignUpPage() {
    this.urlString = '/signUp';
    this.router.navigate([this.urlString]);
  }
}

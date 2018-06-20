import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../services/validation/validation.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  model: any = {};
  
  constructor(private validator: ValidationService) { }

  ngOnInit() {
  }

  register(event) {
    console.log(event);
  }
}

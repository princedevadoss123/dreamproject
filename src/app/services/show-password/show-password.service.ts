import { Injectable } from '@angular/core';

@Injectable()
export class ShowPasswordService {

  constructor() { }

  showPassword(loginCheck,passwd,confirmPasswd){
  
    if(loginCheck) {
      passwd[0].setAttribute('type', 'text');
      if(confirmPasswd)
      confirmPasswd[0].setAttribute('type', 'text');
    }
    else {
      passwd[0].setAttribute('type', 'password');
      if(confirmPasswd)
      confirmPasswd[0].setAttribute('type', 'password');
    }
  }

}

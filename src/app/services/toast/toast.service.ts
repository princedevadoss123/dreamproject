import { Injectable } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable()
export class ToastService {

  constructor() { }

  sendMessage(content, style)
  {
   // const message = new Message(content, style)
  }
}

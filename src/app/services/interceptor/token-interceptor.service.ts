import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { TokenService } from '../tokens/token.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private tokenizer: TokenService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      console.log('intercept');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.tokenizer.getToken()}`
        }
      });
      return next.handle(request);
    }

}

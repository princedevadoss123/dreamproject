import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
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
      if(request.url != '/user/signup' && request.url != '/auth/login') {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.tokenizer.getToken()}`
          }
        });
      }
      return next.handle(request).map((event: HttpEvent<any>) => {
        
      })
      .catch((error:any, caught) => {
        if(error instanceof HttpErrorResponse) {
          if(error.status === 403) {
            this.tokenizer.removeToken();
          }
          return Observable.throw(error);
        }
      });
    }

}

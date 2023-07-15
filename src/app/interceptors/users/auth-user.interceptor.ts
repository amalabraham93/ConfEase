import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { SpinnerService } from '../../shared/spinner/spinner.service';

@Injectable()
export class AuthUserInterceptor implements HttpInterceptor {

  constructor(private _cookie: CookieService, private _spinner: SpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = localStorage.getItem('jwt-user');
  let authReq: HttpRequest<any>;

  if (token) {
    authReq = request.clone({ setHeaders: { Authorization: token } ,withCredentials:true});
  } else {
    authReq = request.clone();
  }

  this._spinner.requestStarted();
  return this.handler(next, authReq);
}

  handler(next: HttpHandler, request: HttpRequest<any>) {
    return next.handle(request)
      .pipe(
        tap(
          (event) => {
            if (event instanceof HttpResponse) {
              this._spinner.requestEnded();
            }
          },
          (error: HttpErrorResponse) => {
            this._spinner.resetSpinner();
            throw error;
          }
        )
      );
  }
}

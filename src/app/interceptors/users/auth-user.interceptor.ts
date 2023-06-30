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
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';

@Injectable()
export class AuthUserInterceptor implements HttpInterceptor {

  constructor(private _cookie: CookieService, private _spinner: SpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authReq = request.clone({ withCredentials: true });

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

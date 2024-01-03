import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  static readonly JWT_COOKIE_NAME = ''

  constructor(
    private readonly cookieService: CookieService
  ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const jwtToken = this.cookieService.get(JWTInterceptor.JWT_COOKIE_NAME)

    if (!jwtToken) {
      console.warn('CSRF token could not be retrieved, sending request anyway...')
      return next.handle(req)
    }

    const requestWithJWTToken = req.clone({
      headers: req.headers.set('authorization',['Bearer',jwtToken])
    })

    return next.handle(requestWithJWTToken)
  }
}

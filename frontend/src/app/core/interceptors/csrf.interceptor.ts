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
export class CsrfInterceptor implements HttpInterceptor {

  static readonly CSRF_COOKIE_NAME = 'MARIAGE_CSRF_TOKEN'
  static readonly CSRF_HEADER_NAME = 'X-CSRF-Token'

  readonly whitelistedMethods = [
    'GET',
    'HEAD',
    'OPTIONS'
  ]

  constructor(
    private readonly cookieService: CookieService
  ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.whitelistedMethods.includes(req.method.toUpperCase()))
      return next.handle(req)

    const csrfToken = this.cookieService.get(CsrfInterceptor.CSRF_COOKIE_NAME)

    if (!csrfToken) {
      console.warn('CSRF token could not be retrieved, sending request anyway...')
      return next.handle(req)
    }

    const requestWithCsrfToken = req.clone({
      headers: req.headers.set(CsrfInterceptor.CSRF_HEADER_NAME, csrfToken)
    })

    return next.handle(requestWithCsrfToken)
  }
}

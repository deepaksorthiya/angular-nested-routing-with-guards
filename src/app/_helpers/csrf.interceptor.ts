import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Interceptor that adds XSRF token to outgoing requests.
 * The token is added to the `X-XSRF-TOKEN` header.
 * this interceptor is reuired only if the backend is on a different origin.
 * for local development with same origin backend, this interceptor is not required.
 */
@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  constructor(private httpXsrfTokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(
      'Request URL: ' +
        req.url +
        '  Request Method: ' +
        req.method +
        ' Request Headers: ' +
        req.headers.keys()
    );
    const csrfToken = this.httpXsrfTokenExtractor.getToken();
    console.log('XSRF TOKEN: ', csrfToken);

    req = req.clone({
      withCredentials: true,
      headers: req.headers.set('X-XSRF-TOKEN', csrfToken || ''),
    });

    return next.handle(req);
  }
}

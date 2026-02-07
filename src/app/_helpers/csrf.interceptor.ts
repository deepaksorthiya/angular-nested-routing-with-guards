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
      /** withCredentials: true is required to send the cookie with the request to backend if backend is on different origin
       * and on local with different port as well, as browser treats different port as different origin and will not send the cookie
       * with the request to backend without withCredentials set to true
       * but if backend is on same origin then withCredentials is not required as browser will send the cookie automatically with each request
       * commenting out withCredentials because external api used in this project for demo does not support CORS and withCredentials set to true will cause CORS error,
       * so for demo purpose we are not using withCredentials here, but in real application with backend on different origin with CORS enabled,
       *  withCredentials should be set to true to send the cookie with the request to backend
       */
      // withCredentials: true,
      headers: req.headers.set('X-XSRF-TOKEN', csrfToken || ''),
    });

    return next.handle(req);
  }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

/**
 * intercept and handle 401 globally
 * this interceptor will be used in to simulate 401 response from backend when user
 * is not authenticated on backend side but locally authentication is valid
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if ([401].includes(err.status) && this.authService.isAuthenticated()) {
          // auto logout if 401 response returned from backend api and reset the authenticated user to null
          // after this auth guard will redirect to login page as user is not authenticated anymore
          this.authService.resetAuthenticatedUser();
        }
        console.error('Error From Interceptor :: ', err);
        return throwError(() => err);
      })
    );
  }
}

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

// used to create fake backend

import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

import { catchError, of, tap } from 'rxjs';
import { AuthService } from './_helpers/auth.service';
import { CsrfInterceptor } from './_helpers/csrf.interceptor';
import { FakeBackendInterceptor } from './_helpers/fake-backend';
import { AccountService } from './_services/account.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: Window, useValue: window },
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true },
    // provider used to create fake backend
    // use fake backend in place of Http service for backend-less development
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true,
    },
    // intialize app by fetching current user details to check if logged in
    provideAppInitializer(() => {
      return inject(AuthService).getUserDetails();
    }),
    // example of another app initializer that calls a fake rest api with AccountService
    provideAppInitializer(() => {
      return inject(AccountService)
        .callFakeRestApi()
        .pipe(
          tap(data => {
            console.log(data);
          })
        )
        .pipe(
          catchError(error => {
            // Handle the error here returning empty array
            console.error('ERROR :: ', error);
            return of([]);
          })
        );
    }),
    // another example of app initializer that calls a public rest api with HttpClient
    provideAppInitializer(() => {
      const http = inject(HttpClient);
      return http
        .get('https://jsonplaceholder.typicode.com/posts/1/comments')
        .pipe(
          tap(data => {
            console.log(data);
          })
        )
        .pipe(
          catchError(error => {
            // Handle the error here returning empty array
            console.error('ERROR :: ', error);
            return of([]);
          })
        );
    }),
    // simulate a long app initialization process for demo purposes
    provideAppInitializer(() => new Promise<void>(resolve => setTimeout(resolve, 2000))),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
  ],
};

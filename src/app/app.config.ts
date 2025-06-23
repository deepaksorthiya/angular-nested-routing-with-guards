import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
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
import { FakeBackendInterceptor } from './_helpers/fake-backend';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

import { catchError, delay, of, tap } from 'rxjs';
import { AccountService } from './_services/account.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: Window, useValue: window },
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    // use fake backend in place of Http service for backend-less development
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true,
    },
    provideAppInitializer(() => {
      return inject(AccountService)
        .callFakeRestApi()
        .pipe(delay(2000))
        .pipe(
          tap(data => {
            console.log(data);
          })
        )
        .pipe(
          catchError(error => {
            // Handle the error here
            console.error('ERROR :: ', error);
            return of([]);
          })
        );
    }),
    provideAppInitializer(() => {
      const http = inject(HttpClient);
      return http
        .get('https://jsonplaceholder.typicode.com/posts/1/comments')
        .pipe(delay(2000))
        .pipe(
          tap(data => {
            console.log(data);
          })
        )
        .pipe(
          catchError(error => {
            // Handle the error here
            console.error('ERROR :: ', error);
            return of([]);
          })
        );
    }),
    provideAppInitializer(() => new Promise<void>(resolve => setTimeout(resolve, 2000))),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};

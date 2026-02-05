import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize } from 'rxjs/operators';

// array in local storage for registered users
let users: any[] = [
  { firstName: 'user', lastName: 'user', username: 'user', password: 'password', id: '1' },
  { firstName: 'admin', lastName: 'admin', username: 'admin', password: 'password', id: '2' },
];

const UNAUTHORIZED_MSG = 'Unauthorized';
const UNAUTHORIZED_INVALID_CREDENTIALS = 'Username or password is incorrect';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, params, body } = request;

    return handleRoute();

    function handleRoute() {
      switch (true) {
        case url.endsWith('/api/login') && method === 'POST':
          return authenticate();
        case url.endsWith('/api/logout') && method === 'POST':
          return logout();
        case url.endsWith('/users/register') && method === 'POST':
          return register();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        case url.match(/\/users\/\d+$/) && method === 'PUT':
          return updateUser();
        case url.match(/\/users\/\d+$/) && method === 'DELETE':
          return deleteUser();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const username = params.get('username');
      const password = params.get('password');
      const user = users.find(x => x.username === username && x.password === password);
      if (!user) return unauthorized(UNAUTHORIZED_INVALID_CREDENTIALS);
      return ok({
        ...basicDetails(user),
        token: 'fake-jwt-token',
      });
    }

    function logout() {
      return ok();
    }

    function register() {
      const user = body;

      if (users.find(x => x.username === user.username)) {
        return error('Username "' + user.username + '" is already taken');
      }

      user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
      users.push(user);
      return ok();
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized(UNAUTHORIZED_MSG);
      return ok(users.map(x => basicDetails(x)));
    }

    function getUserById() {
      if (!isLoggedIn()) return unauthorized(UNAUTHORIZED_MSG);

      const user = users.find(x => x.id === idFromUrl());
      return ok(basicDetails(user));
    }

    function updateUser() {
      if (!isLoggedIn()) return unauthorized(UNAUTHORIZED_MSG);

      let params = body;
      let user = users.find(x => x.id === idFromUrl());

      // only update password if entered
      if (!params.password) {
        delete params.password;
      }

      // update and save user
      Object.assign(user, params);
      return ok();
    }

    function deleteUser() {
      if (!isLoggedIn()) return unauthorized(UNAUTHORIZED_MSG);

      users = users.filter(x => x.id !== idFromUrl());
      return ok();
    }

    // helper functions

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500)); // delay observable to simulate server api call
    }

    function error(message: string) {
      return throwError(() => ({ error: { message } })).pipe(
        materialize(),
        delay(500),
        dematerialize()
      ); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    function unauthorized(msg: string) {
      return throwError(() => ({
        status: 401,
        error: { message: msg },
      })).pipe(materialize(), delay(500), dematerialize());
    }

    function basicDetails(user: any) {
      const { id, username, firstName, lastName } = user;
      return { id, username, firstName, lastName };
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

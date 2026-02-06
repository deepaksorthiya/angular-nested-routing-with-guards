import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthUser } from '../_helpers/auth.model';
import { AuthService } from '../_helpers/auth.service';
import { AuthStorageService } from '../_helpers/auth.storage.service';
import { Post } from '../_models/post';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(
    private authService: AuthService,
    private authStorageService: AuthStorageService,
    private http: HttpClient
  ) {}

  callFakeRestApi() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/1/comments');
  }

  getAllUsers() {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users/');
  }

  getPostById(id: number) {
    return this.http.get<Post>(`https://dummyjson.com/posts/${id}`);
  }

  getDateTimeAsync(date: string) {
    const baseParams = new HttpParams().set('offsetDateTime', date);
    return this.http.get<any>(`http://localhost:8080/offset`, {
      params: baseParams,
    });
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  update(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, params).pipe(
      map(x => {
        // update stored user if the logged in user updated their own record
        const authUser = this.authService.currentUser() as AuthUser;
        if (id == authUser?.id) {
          const user = { ...authUser, ...params } as AuthUser;
          // update auth user in local storage
          this.authService.setAuthenticatedUser(user);
        }
        return x;
      })
    );
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`).pipe(
      map(x => {
        // auto logout if the logged in user deleted their own record
        if (id == this.authService.currentUser()?.id) {
          this.authService.logout();
        }
        return x;
      })
    );
  }
}

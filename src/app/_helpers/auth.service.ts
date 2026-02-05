import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { LoginRequest } from './auth.model';
import { AuthStorageService } from './auth.storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSubject: BehaviorSubject<User | null>;
  public readonly user: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private authStorageService: AuthStorageService
  ) {
    this.userSubject = new BehaviorSubject(this.authStorageService.loadUser());
    this.user = this.userSubject.asObservable();
  }

  login(payload: LoginRequest): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, payload).pipe(
      tap(user => {
        this.authStorageService.saveUser(user);
        this.userSubject.next(user);
      })
    );
  }

  getUserSubject(): BehaviorSubject<User | null> {
    return this.userSubject;
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/users/logout`, null).pipe(
      tap(user => {
        this.authStorageService.clearUser();
        this.userSubject.next(null);
      })
    );
  }

  currentUser(): User | null {
    return this.userValue();
  }

  isAuthenticated(): boolean {
    return this.userValue() != null;
  }

  token(): string | null {
    return this.userValue()?.token ?? null;
  }

  /**
   * function for getting user value from storage
   * help when user manually clears storage
   */
  userValue(): User | null {
    if (this.authStorageService.loadUser()) {
      return this.userSubject.value;
    }
    return null;
  }
}

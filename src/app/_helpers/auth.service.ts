import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { LoginRequest } from './auth.model';
import { AuthStorageService } from './auth.storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSubject: BehaviorSubject<User | null>;
  private readonly user: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private authStorageService: AuthStorageService
  ) {
    this.userSubject = new BehaviorSubject(this.authStorageService.loadUser());
    this.user = this.userSubject.asObservable();
  }

  login(payload: LoginRequest): Observable<User> {
    const params = new HttpParams()
      .set('username', payload.username)
      .set('password', payload.password);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post<User>(`${environment.apiUrl}/api/login`, {}, { headers, params }).pipe(
      tap(user => {
        this.setAuthenticatedUser(user);
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/api/logout`, null).pipe(
      tap(_ => {
        this.resetAuthenticatedUser();
      })
    );
  }

  getUserDetails(): Observable<User | null> {
    return this.http
      .get<User>(`${environment.apiUrl}/api/user/me`)
      .pipe(
        tap({
          next: user => {
            this.setAuthenticatedUser(user);
          },
        })
      )
      .pipe(
        catchError(error => {
          // Handle the error here returning null
          console.error('ERROR from CatchERROR :: ', error);
          this.resetAuthenticatedUser();
          return of(null);
        })
      );
  }

  setAuthenticatedUser(user: User): void {
    this.authStorageService.saveUser(user);
    this.userSubject.next(user);
  }

  resetAuthenticatedUser(): void {
    this.authStorageService.clearUser();
    this.userSubject.next(null);
  }

  getUserSubject(): BehaviorSubject<User | null> {
    return this.userSubject;
  }

  getUserObservable(): Observable<User | null> {
    return this.user;
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

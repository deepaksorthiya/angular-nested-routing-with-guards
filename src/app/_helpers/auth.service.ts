import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthUser, LoginRequest } from './auth.model';
import { AuthStorageService } from './auth.storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authUserSubject: BehaviorSubject<AuthUser | null>;
  private readonly authUser: Observable<AuthUser | null>;

  constructor(
    private http: HttpClient,
    private authStorageService: AuthStorageService
  ) {
    this.authUserSubject = new BehaviorSubject(this.authStorageService.loadUser());
    this.authUser = this.authUserSubject.asObservable();
  }

  login(payload: LoginRequest): Observable<AuthUser> {
    const params = new HttpParams()
      .set('username', payload.username)
      .set('password', payload.password);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http
      .post<AuthUser>(`${environment.apiUrl}/api/login`, {}, { headers, params })
      .pipe(
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

  getUserDetails(): Observable<AuthUser | null> {
    return this.http
      .get<AuthUser>(`${environment.apiUrl}/api/user/me`)
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

  setAuthenticatedUser(authUser: AuthUser): void {
    this.authStorageService.saveUser(authUser);
    this.authUserSubject.next(authUser);
  }

  resetAuthenticatedUser(): void {
    this.authStorageService.clearUser();
    this.authUserSubject.next(null);
  }

  getUserSubject(): BehaviorSubject<AuthUser | null> {
    return this.authUserSubject;
  }

  getUserObservable(): Observable<AuthUser | null> {
    return this.authUser;
  }

  currentUser(): AuthUser | null {
    return this.userValue();
  }

  isAuthenticated(): boolean {
    return this.userValue() != null;
  }

  /**
   * function for getting user value from storage
   * help when user manually clears storage
   */
  userValue(): AuthUser | null {
    if (this.authStorageService.loadUser()) {
      return this.authUserSubject.value;
    }
    return null;
  }
}

import { Injectable } from '@angular/core';
import { AuthUser } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthStorageService {
  private readonly KEY = 'user';
  private readonly ROUTE_URL = 'redirectUrl';

  saveUser(authUser: AuthUser): void {
    sessionStorage.setItem(this.KEY, JSON.stringify(authUser));
  }

  loadUser(): AuthUser | null {
    const raw = sessionStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) : null;
  }

  clearUser(): void {
    sessionStorage.removeItem(this.KEY);
  }

  saveRedirectUrl(url: string): void {
    sessionStorage.setItem(this.ROUTE_URL, url);
  }

  loadRedirectUrl(): string | null {
    return sessionStorage.getItem(this.ROUTE_URL);
  }

  clearRedirectUrl(): void {
    sessionStorage.removeItem(this.ROUTE_URL);
  }
}

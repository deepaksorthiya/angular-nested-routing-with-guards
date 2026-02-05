import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
/**
 * This guard restricts access to login and register routes for authenticated users.
 * @param _
 * @param state
 * @returns
 */
export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // if user is not authenticated, allow access
  if (!authService.isAuthenticated()) {
    return true;
  }
  // if user is already authenticated then redirect to home page
  router.navigate(['/']);
  return false;
};

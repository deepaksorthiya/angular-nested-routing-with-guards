import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
/**
 * This guard restricts access to login and register routes for authenticated users.
 * @param _
 * @param state
 * @returns
 */
export const guestGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  const user = accountService.userValue;
  // if user is not authenticated, allow access
  if (!user) {
    return true;
  }
  // if user is already authenticated then redirect to home page
  router.navigate(['/']);
  return false;
};

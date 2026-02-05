import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthStorageService } from './auth.storage.service';

/**
 * Angular route guard that checks if a user is authenticated before allowing access to protected routes.
 *
 * If the user is authenticated, the route activation is allowed.
 * If the user is not authenticated, the user is redirected to the login page with a return URL
 * query parameter to enable navigation back to the originally requested route after successful login.
 * The return URL is also stored in session storage fix issue when user hit url in browser directly or hard reload page.
 *
 * @param _ - The component to be activated (unused)
 * @param state - The router state containing information about the requested route URL
 * @returns `true` if the user is authenticated and the route can be activated; `false` if the user is not authenticated
 *
 * @example
 * ```typescript
 * const routes: Routes = [
 *   {
 *     path: 'dashboard',
 *     component: DashboardComponent,
 *     canActivate: [authGuard]
 *   }
 * ];
 * ```
 */
export const authGuard: CanActivateFn = (_, state) => {
  const authService = inject(AuthService);
  const authStorageService = inject(AuthStorageService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // authorised so return true allow to access route
    return true;
  }
  // store the attempted URL for redirecting
  authStorageService.saveRedirectUrl(state.url);
  // not logged in so redirect to login page with the return url
  router.navigate(['/account/login']);
  return false;
};

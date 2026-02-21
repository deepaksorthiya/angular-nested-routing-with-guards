import { Routes } from '@angular/router';

import { guestGuard } from '../_helpers/guest.guard';
import { LayoutComponent } from './layout.component';

export const accountRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [guestGuard],
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./login.component').then(m => m.LoginComponent),
      },
      {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('./register.component').then(m => m.RegisterComponent),
      },
    ],
  },
];

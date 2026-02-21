import { Routes } from '@angular/router';
import { authGuard } from './_helpers/auth.guard';
import { Page404Component } from './page404/page404.component';

const accountRoutes = () => import('./account/account-routes').then(ar => ar.accountRoutes);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const leavesRoutes = () => import('./leaves/leaves-routes').then(x => x.leavesRoutes);

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard],
  },
  {
    path: 'users',
    loadChildren: usersModule,
    canActivate: [authGuard],
  },
  {
    path: 'leaves',
    loadChildren: leavesRoutes,
    canActivate: [authGuard],
  },
  { path: 'account', loadChildren: accountRoutes },
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    title: 'Profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard],
  },
  {
    path: 'work',
    title: 'Work',
    loadComponent: () => import('./work/work.component').then(m => m.WorkComponent),
    canActivate: [authGuard],
  },
  {
    path: 'attendance',
    title: 'Attendance',
    loadComponent: () =>
      import('./attendance/attendance.component').then(m => m.AttendanceComponent),
    canActivate: [authGuard],
  },
  {
    path: 'destroy-check',
    title: 'Destroy Check',
    loadComponent: () =>
      import('./destroy-check/destroy-check.component').then(m => m.DestroyCheckComponent),
    canActivate: [authGuard],
  },
  {
    path: 'users-table',
    title: 'Users Table',
    loadComponent: () =>
      import('./users-table/users-table.component').then(m => m.UsersTableComponent),
    canActivate: [authGuard],
  },
  {
    path: 'ngb-alert',
    title: 'Ngb Alert',
    loadComponent: () => import('./ngbalert/ngbalert.component').then(m => m.NgbalertComponent),
    canActivate: [authGuard],
  },
  {
    path: '**',
    title: 'Not Found',
    component: Page404Component,
  },
];

import { Routes } from '@angular/router';
import { authGuard } from './_helpers/auth.guard';
import { AttendanceComponent } from './attendance/attendance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DestroyCheckComponent } from './destroy-check/destroy-check.component';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page404/page404.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { WorkComponent } from './work/work.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const leavesModule = () => import('./leaves/leaves.module').then(x => x.LeavesModule);

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users',
    loadChildren: usersModule,
    canActivate: [authGuard],
  },
  {
    path: 'leaves',
    loadChildren: leavesModule,
    canActivate: [authGuard],
  },
  { path: 'account', loadChildren: accountModule },
  {
    path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    title: 'Profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'work',
    title: 'Work',
    component: WorkComponent,
    canActivate: [authGuard],
  },
  {
    path: 'attendance',
    title: 'Attendance',
    component: AttendanceComponent,
    canActivate: [authGuard],
  },
  {
    path: 'destroy-check',
    title: 'Destroy Check',
    component: DestroyCheckComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users-table',
    title: 'Users Table',
    component: UsersTableComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    title: 'Not Found',
    component: Page404Component,
  },
];

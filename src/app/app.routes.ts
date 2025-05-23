import { Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { AttendanceComponent } from './attendance/attendance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DestroyCheckComponent } from './destroy-check/destroy-check.component';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page404/page404.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { WorkComponent } from './work/work.component';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);
const usersModule = () =>
  import('./users/users.module').then((x) => x.UsersModule);
const leavesModule = () =>
  import('./leaves/leaves.module').then((x) => x.LeavesModule);

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: usersModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'leaves',
    loadChildren: leavesModule,
    canActivate: [AuthGuard],
  },
  { path: 'account', loadChildren: accountModule },
  {
    path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    title: 'Profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'work',
    title: 'Work',
    component: WorkComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'attendance',
    title: 'Attendance',
    component: AttendanceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'destroy-check',
    title: 'Destroy Check',
    component: DestroyCheckComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users-table',
    title: 'Users Table',
    component: UsersTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    title: 'Not Found',
    component: Page404Component,
  },
];

import { Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { AttendanceComponent } from './attendance/attendance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DestroyCheckComponent } from './destroy-check/destroy-check.component';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page404/page404.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkComponent } from './work/work.component';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);
const usersModule = () =>
  import('./users/users.module').then((x) => x.UsersModule);
const leavesModule = () =>
  import('./leaves/leaves.module').then((x) => x.LeavesModule);

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'leaves', loadChildren: leavesModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'work',
    component: WorkComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'attendance',
    component: AttendanceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'destroy-check',
    component: DestroyCheckComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: Page404Component,
  },
];

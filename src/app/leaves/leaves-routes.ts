import { Routes } from '@angular/router';
import { LeavesComponent } from './leaves.component';

export const leavesRoutes: Routes = [
  {
    path: '',
    component: LeavesComponent,
    children: [
      {
        path: 'apply',
        title: 'Apply',
        loadComponent: () => import(`./apply/apply.component`).then(m => m.ApplyComponent),
      },
      {
        path: 'holiday',
        title: 'Holiday',
        loadComponent: () => import(`./holiday/holiday.component`).then(m => m.HolidayComponent),
      },
      {
        path: 'balance',
        loadChildren: () => import(`./balance/balance-routes`).then(m => m.balanceRoutes),
      },
      {
        path: '',
        title: 'Apply',
        redirectTo: 'apply',
        pathMatch: 'full',
      },
      {
        path: '**',
        title: 'Leave 404 Not Found',
        loadComponent: () =>
          import(`./page404leaves/page404leaves.component`).then(m => m.Page404leavesComponent),
      },
    ],
  },
];

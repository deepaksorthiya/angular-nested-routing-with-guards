import { Routes } from '@angular/router';
import { BalanceComponent } from './balance.component';

export const balanceRoutes: Routes = [
  {
    path: '',
    component: BalanceComponent,
    children: [
      {
        path: 'casual',
        title: 'Casual',
        loadComponent: () => import(`./casual/casual.component`).then(m => m.CasualComponent),
      },
      {
        path: 'earned',
        title: 'Earned',
        loadComponent: () => import(`./earned/earned.component`).then(m => m.EarnedComponent),
      },
      {
        path: '',
        title: 'Casual',
        redirectTo: 'casual',
        pathMatch: 'full',
      },
      {
        path: '**',
        title: 'Not Found',
        loadComponent: () =>
          import(`./page404balance/page404balance.component`).then(m => m.Page404balanceComponent),
      },
    ],
  },
];

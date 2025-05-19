import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceComponent } from './balance.component';
import { CasualComponent } from './casual/casual.component';
import { EarnedComponent } from './earned/earned.component';
import { Page404balanceComponent } from './page404balance/page404balance.component';

const routes: Routes = [
  {
    path: '',
    component: BalanceComponent,
    children: [
      {
        path: 'casual',
        title: 'Casual',
        component: CasualComponent,
      },
      {
        path: 'earned',
        title: 'Earned',
        component: EarnedComponent,
      },
      {
        path: '',
        title: 'Casual',
        redirectTo: 'casual',
        pathMatch: 'full',
      },
      { path: '**', title: 'Not Found', component: Page404balanceComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BalanceRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyComponent } from './apply/apply.component';
import { HolidayComponent } from './holiday/holiday.component';
import { LeavesComponent } from './leaves.component';
import { Page404leavesComponent } from './page404leaves/page404leaves.component';

const routes: Routes = [
  {
    path: '',
    component: LeavesComponent,
    children: [
      {
        path: 'apply',
        title: 'Apply',
        component: ApplyComponent,
      },
      {
        path: 'holiday',
        title: 'Holiday',
        component: HolidayComponent,
      },
      {
        path: 'balance',
        loadChildren: () =>
          import(`./balance/balance.module`).then((m) => m.BalanceModule),
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
        component: Page404leavesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeavesRoutingModule {}

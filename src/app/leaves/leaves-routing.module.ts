import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyComponent } from './apply/apply.component';
import { LeavesComponent } from './leaves.component';
import { Page404leavesComponent } from './page404leaves/page404leaves.component';
import { HolidayComponent } from './holiday/holiday.component';

const routes: Routes = [
  {
    path: '',
    component: LeavesComponent,
    children: [
      {
        path: 'apply',
        component: ApplyComponent,
      },
      {
        path: 'holiday',
        component: HolidayComponent,
      },
      {
        path: 'balance',
        loadChildren: () =>
          import(`./balance/balance.module`).then((m) => m.BalanceModule),
      },
      {
        path: '',
        redirectTo: 'apply',
        pathMatch: 'full',
      },
      { path: '**', component: Page404leavesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeavesRoutingModule {}

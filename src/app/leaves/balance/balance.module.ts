import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { BalanceRoutingModule } from './balance-routing.module';
import { BalanceComponent } from './balance.component';
import { CasualComponent } from './casual/casual.component';
import { EarnedComponent } from './earned/earned.component';
import { Page404balanceComponent } from './page404balance/page404balance.component';

@NgModule({
  declarations: [
    BalanceComponent,
    CasualComponent,
    EarnedComponent,
    Page404balanceComponent,
  ],
  imports: [CommonModule, BalanceRoutingModule, NgbNavModule],
})
export class BalanceModule {}

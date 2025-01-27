import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApplyComponent } from './apply/apply.component';
import { HolidayComponent } from './holiday/holiday.component';
import { LeavesRoutingModule } from './leaves-routing.module';
import { LeavesComponent } from './leaves.component';
import { Page404leavesComponent } from './page404leaves/page404leaves.component';

@NgModule({
  declarations: [
    LeavesComponent,
    ApplyComponent,
    Page404leavesComponent,
    HolidayComponent,
  ],
  imports: [CommonModule, LeavesRoutingModule],
})
export class LeavesModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { guestGuard } from '../_helpers/guest.guard';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [guestGuard],
    children: [
      { path: 'login', title: 'Login', component: LoginComponent },
      { path: 'register', title: 'Register', component: RegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}

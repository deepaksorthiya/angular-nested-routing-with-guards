import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddEditComponent } from './add-edit.component';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', title: 'All Users', component: ListComponent },
      { path: 'add', title: 'Add User', component: AddEditComponent },
      { path: 'edit/:id', title: 'Edit User', component: AddEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}

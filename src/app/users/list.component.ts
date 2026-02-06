import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '../_services/account.service';

@Component({
  templateUrl: 'list.component.html',
  standalone: false,
})
export class ListComponent implements OnInit {
  users?: any[];

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService
      .getAll()
      .subscribe(users => (this.users = users));
  }

  deleteUser(id: string) {
    const user = this.users!.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService
      .delete(id)
      .pipe(first())
      .subscribe(() => (this.users = this.users!.filter(x => x.id !== id)));
  }
}

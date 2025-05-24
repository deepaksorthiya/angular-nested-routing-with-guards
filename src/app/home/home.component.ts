import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: 'home.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class HomeComponent {
  user: User | null;

  constructor(private accountService: AccountService, private router: Router) {
    this.user = this.accountService.userValue;
  }

  manageUsers() {
    this.router.navigateByUrl('/users');
  }
}

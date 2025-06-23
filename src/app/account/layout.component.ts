import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  templateUrl: 'layout.component.html',
  standalone: false,
})
export class LayoutComponent {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
    console.log('LayoutComponent constructor');
    // redirect to home if already logged in
    if (this.accountService.userValue) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/account/login']);
    }
  }

  ngOnInit() {
    console.log('LayoutComponent ngOnInit');
  }
}

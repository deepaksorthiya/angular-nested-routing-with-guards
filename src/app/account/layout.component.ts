import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  templateUrl: 'layout.component.html',
  standalone: false,
})
export class LayoutComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
    console.log('LayoutComponent constructor');
  }

  ngOnInit() {
    console.log('LayoutComponent ngOnInit');
    console.log(this.route);
  }
}

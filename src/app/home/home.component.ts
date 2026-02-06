import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_helpers/auth.service';
import { AuthUser } from '../_helpers/auth.model';

@Component({
  templateUrl: 'home.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class HomeComponent {
  authUser: AuthUser | null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authUser = this.authService.currentUser();
  }

  manageUsers() {
    this.router.navigateByUrl('/users');
  }
}

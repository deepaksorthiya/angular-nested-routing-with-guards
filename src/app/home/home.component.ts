import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_helpers/auth.service';
import { User } from '../_models/user';

@Component({
  templateUrl: 'home.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class HomeComponent {
  user: User | null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user = this.authService.currentUser();
  }

  manageUsers() {
    this.router.navigateByUrl('/users');
  }
}

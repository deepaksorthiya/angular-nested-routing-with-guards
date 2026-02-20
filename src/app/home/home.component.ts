import { JsonPipe } from '@angular/common';
import { Component, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from '../_helpers/auth.model';
import { AuthService } from '../_helpers/auth.service';

@Component({
  templateUrl: 'home.component.html',
  standalone: true,
  imports: [JsonPipe],
})
export class HomeComponent {
  authUser: AuthUser | null;
  angularVersion = VERSION.full;

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

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
  postResponse: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authUser = this.authService.currentUser();
  }

  manageUsers() {
    this.router.navigateByUrl('/users');
  }

  getUserDetails() {
    this.authService.getUserDetails().subscribe({
      next: user => {
        this.authUser = { ...this.authUser, ...user } as AuthUser;
      },
      error: error => {
        console.error('Error fetching user details:', error);
      },
    });
  }

  performPostRequest() {
    this.authService.performPostRequest().subscribe({
      next: response => {
        this.postResponse = response;
        alert('POST request successful!');
        console.log('POST request successful:', response);
      },
      error: error => {
        alert('Error performing POST request. Check console for details.');
        console.error('Error performing POST request:', error);
      },
    });
  }
}

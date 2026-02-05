import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_helpers/auth.service';
import { AuthStorageService } from '../_helpers/auth.storage.service';
import { AlertService } from '../_services/alert.service';

@Component({
  templateUrl: 'login.component.html',
  standalone: false,
})
export class LoginComponent implements OnInit {
  form: any;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private authStorageService: AuthStorageService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['user', Validators.required],
      password: ['password', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    let loginRequest = {
      username: this.f.username.value,
      password: this.f.password.value,
    };

    this.loading = true;
    this.authService.login(loginRequest).subscribe({
      next: () => {
        // get return url from sessionStorage or default to home page
        let returnUrl = this.authStorageService.loadRedirectUrl() || '/';
        this.authStorageService.clearRedirectUrl();
        this.router.navigateByUrl(returnUrl);
      },
      error: error => {
        this.alertService.error(error?.error?.message || 'Login failed');
        this.loading = false;
      },
    });
  }
}

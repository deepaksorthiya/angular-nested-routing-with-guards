import { NgClass } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../_helpers/auth.service';
import { AuthStorageService } from '../_helpers/auth.storage.service';
import { AlertService } from '../_services/alert.service';
import { LoginForm } from './login-form.model';

@Component({
  templateUrl: 'login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
})
export class LoginComponent implements OnInit {
  form!: FormGroup<LoginForm>;
  // replace plain booleans with signals for component state
  loading: WritableSignal<boolean> = signal(false);
  submitted: WritableSignal<boolean> = signal(false);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private authStorageService: AuthStorageService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: new FormControl<string>('user', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      }),
      password: new FormControl<string>('password', {
        nonNullable: true,
        validators: Validators.required,
      }),
      rememberMe: new FormControl<boolean>(false, { nonNullable: true }),
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    // mark submitted via signal
    this.submitted.set(true);

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    let loginRequest = {
      username: this.f.username.value,
      password: this.f.password.value,
      rememberMe: this.f.rememberMe.value,
    };

    // set loading flag via signal
    this.loading.set(true);
    this.authService.login(loginRequest).subscribe({
      next: user => {
        console.log('Login Successful:', user);
        // get return url from sessionStorage or default to home page
        let returnUrl = this.authStorageService.loadRedirectUrl() || '/';
        this.authStorageService.clearRedirectUrl();
        this.router.navigateByUrl(returnUrl);
      },
      error: error => {
        this.alertService.error(error?.error?.detail || 'Login failed');
        // clear loading flag on error
        this.loading.set(false);
      },
    });
  }
}

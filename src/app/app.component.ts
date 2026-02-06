import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DOCUMENT, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressRouter } from 'ngx-progressbar/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AlertComponent } from './_components/alert.component';
import { AuthService } from './_helpers/auth.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgProgressbar,
    NgProgressRouter,
    CommonModule,
    AlertComponent,
    NgbCollapseModule,
    NgbDropdownModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  user$!: Observable<User | null>;
  private readonly document = inject(DOCUMENT);
  private readonly selector = 'globalLoader';
  isMenuCollapsed = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    console.log('AppComponent constructor initialized.');
  }

  ngOnInit(): void {
    this.user$ = this.authService.getUserObservable();
    console.log('AppComponent ngOnInit() initialized.');
    console.log(environment);
  }

  ngOnDestroy(): void {
    console.log('AppComponent ngOnDestroy() initialized.');
  }

  private getElement() {
    return this.document.getElementById(this.selector);
  }

  hide() {
    const el = this.getElement();
    if (el) {
      el.addEventListener('transitionend', () => {
        el.className = 'global-loader-hidden';
      });

      if (!el.classList.contains('global-loader-hidden')) {
        el.className += ' global-loader-fade-out';
      }
    }
  }

  ngAfterViewInit() {
    this.hide();
    console.log('AppComponent ngAfterViewInit() initialized.');
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/account/login']);
      },
      error: error => {
        console.error('Logout error:', error);
        this.router.navigate(['/account/login']);
      },
    });
  }
}

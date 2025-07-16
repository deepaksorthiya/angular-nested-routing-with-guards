import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy, OnInit, DOCUMENT } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressRouter } from 'ngx-progressbar/router';
import { AlertComponent } from './_components/alert.component';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

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
  user?: User | null;

  private readonly document = inject(DOCUMENT);
  private readonly selector = 'globalLoader';
  isMenuCollapsed = true;

  constructor(private accountService: AccountService) {
    console.log('AppComponent constructor initialized.');
    this.accountService.user.subscribe(x => (this.user = x));
  }

  ngOnInit(): void {
    console.log('AppComponent ngOnInit() initialized.');
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
    this.accountService.logout();
  }
}

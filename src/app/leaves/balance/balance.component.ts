import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-balance',
  standalone: true,
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgbNavModule, AsyncPipe],
})
export class BalanceComponent {
  routingLinks = [
    { title: 'Casual', link: 'casual' },
    { title: 'Earned', link: 'earned' },
    { title: 'Bad Link', link: 'earnedxyz' },
  ];

  constructor(public route: ActivatedRoute) {}
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-balance',
  standalone: false,

  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css',
})
export class BalanceComponent {
  routingLinks = [
    { title: 'Casual', link: 'casual' },
    { title: 'Earned', link: 'earned' },
    { title: 'Bad Link', link: 'earnedxyz' },
  ];

  constructor(public route: ActivatedRoute) {}
}

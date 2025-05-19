import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leaves',
  standalone: false,

  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.css',
})
export class LeavesComponent {
  routingLinks = [
    { title: 'Apply', link: 'apply' },
    { title: 'Holiday', link: 'holiday' },
    { title: 'Balance', link: 'balance' },
    { title: 'Bad Link', link: 'badlink' },
  ];

  constructor(public route: ActivatedRoute) {}
}

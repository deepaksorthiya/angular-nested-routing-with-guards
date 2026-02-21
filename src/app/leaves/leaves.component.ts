import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-leaves',
  standalone: true,
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.css',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgbNavModule, AsyncPipe],
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

import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  Inject,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-destroy-check',
  imports: [],
  templateUrl: './destroy-check.component.html',
  styleUrl: './destroy-check.component.css',
})
export class DestroyCheckComponent implements OnInit, OnDestroy {
  count = 0;
  id: number;
  win: (Window & typeof globalThis) | null;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private window: Window
  ) {
    this.win = this.document.defaultView;
    if (this.win) {
      this.win.navigator.geolocation.getCurrentPosition((position) => {
        console.log('Position :: ' + position);
      });
    }
    console.log('Window Object From Document :: ' + this.win);
    console.log('Document ::' + this.document);
    // Start a timer to increment the counter every second.
    this.id = this.window.setInterval(() => this.count++, 1000);
    // Stop the timer when the component is destroyed.
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => {
      window.clearInterval(this.id);
      console.log('Timer Stopped');
    });
  }

  ngOnInit() {
    console.log('DestroyCheckComponent ngOnInit() initialized');
  }

  ngOnDestroy() {
    console.log('DestroyCheckComponent ngOnDestroy() destroyed');
  }

  stopTimer() {
    this.window.clearInterval(this.id);
  }

  startTimer() {
    this.stopTimer();
    this.id = this.window.setInterval(() => this.count++, 1000);
  }
}

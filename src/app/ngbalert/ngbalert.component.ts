import { Component, effect, signal, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngbalert',
  imports: [NgbAlert],
  templateUrl: './ngbalert.component.html',
  styleUrl: './ngbalert.component.scss',
})
export class NgbalertComponent {
  // ✅ Signal instead of Subject
  private messageSignal = signal<string | null>(null);

  staticAlertClosed = false;

  // ✅ UI signal
  successMessage = signal<string>('');

  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;

  constructor() {
    // ✅ Effect replaces pipe + tap + debounceTime
    effect(onCleanup => {
      const message = this.messageSignal();

      if (!message) return;

      // update UI immediately (tap equivalent)
      this.successMessage.set(message);

      // debounce logic (manual but cleaner)
      const timeout = setTimeout(() => {
        this.selfClosingAlert?.close();
      }, 5000);
      console.log('Created new timer', timeout);

      // cleanup previous timer if message changes
      onCleanup(() => {
        console.log('Cleaning up previous timer', timeout);
        if (timeout) {
          clearTimeout(timeout);
        }
      });
    });
  }

  changeSuccessMessage() {
    this.messageSignal.set(`${new Date()} - Message successfully changed.`);
  }
}

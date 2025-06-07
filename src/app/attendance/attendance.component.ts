import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
})
export class AttendanceComponent {
  constructor() {
    console.log('AttendanceComponent initialized.');
    this.myArrowFunction();
  }

  myArrowFunction = () => {
    console.log('Hello from myArrowFunction!');
  };
}

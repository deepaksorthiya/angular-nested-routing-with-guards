import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  users$!: Observable<User[]>;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.users$ = this.accountService.getAllUsers();
  }
}

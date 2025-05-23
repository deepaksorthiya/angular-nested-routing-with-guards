import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExternalUser } from '../_models/external-user';
import { UserDataService } from '../_services/user-data.service';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  users: ExternalUser[] = [];
  isLoading = true;
  error: string | null = null;
  currentPage = 1;
  itemsPerPage = 10;
  totalUsers = 100;

  constructor(private userService: UserDataService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.error = null;

    this.userService
      .getAllUsers(this.currentPage, this.itemsPerPage)
      .pipe(
        catchError((error) => {
          this.error = 'Failed to load users. Please try again later.';
          this.isLoading = false;
          return throwError(() => error);
        })
      )
      .subscribe((response) => {
        this.users = response?.results || [];
        this.isLoading = false;
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }

  get totalPages(): number {
    return Math.ceil(this.totalUsers / this.itemsPerPage);
  }
}

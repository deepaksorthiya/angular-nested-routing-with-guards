import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../_models/post';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  post$!: Observable<Post>;
  post: Post | undefined;
  postId: number = 1;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.getPostByIdAsync();
    this.getPostByIdSync();
  }

  getPostByIdAsync() {
    this.post$ = this.accountService.getPostById(this.postId);
  }

  getPostByIdSync() {
    this.accountService.getPostById(this.postId).subscribe({
      next: (post) => {
        this.post = post;
        console.log('Post fetched successfully :: ', this.post);
      },
      error: (error) => {
        console.error('Error fetching post :: ', error);
      },
      complete: () => {
        console.log('Post completed successfully :: ', this.post);
      },
    });
  }
}

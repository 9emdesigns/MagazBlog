import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../postModel';
import { PostServiceService } from '../post-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrl: './list-post.component.css',
})
export class ListPostComponent implements OnInit, OnDestroy {
  /* posts = [
    {
      title: 'A journey into coding Angular Apps',
      content: 'A first step into the unknown',
    },
    {
      title: 'A journey of 1000 miles',
      content: 'Starts with the first step',
    },
    {
      title: 'Take the first step',
      content: 'And another one then you walk and then you run!',
    },
  ]; */

  posts: Post[] = [];
  private postsSub!: Subscription;
  constructor(public postService: PostServiceService) {}

  /* getPost(): void {
    this.postService.getPost().subscribe((response: any) => {
      this.posts = response;
    });
  } */

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  ngOnInit() {
    this.postService.getPost();
    this.postsSub = this.postService
      .getPostUpdatedListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}

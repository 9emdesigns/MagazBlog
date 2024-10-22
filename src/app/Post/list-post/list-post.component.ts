import { Component, OnInit } from '@angular/core';
import { Post } from '../postModel';
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrl: './list-post.component.css',
})
export class ListPostComponent implements OnInit {
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

  constructor(public postService: PostServiceService) {}

  /* getPost(): void {
    this.postService.getPost().subscribe((response: any) => {
      this.posts = response;
    });
  } */

  ngOnInit() {
    this.posts = this.postService.getPost();
    this.postService.getPostUpdatedListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
}

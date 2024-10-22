import { Injectable } from '@angular/core';
import { Post } from './postModel';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor() {}

  /*  getPost(): Observable<Post[]> {
    const posts = of(this.posts);
    return posts;
  } */

  getPost() {
    return [...this.posts];
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {
      title: title,
      content: content,
    };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}

import { Injectable } from '@angular/core';
import { Post } from './postModel';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private Http: HttpClient) {}

  /*  getPost(): Observable<Post[]> {
    const posts = of(this.posts);
    return posts;
  } */

  getPost() {
    //return [...this.posts];
    this.Http.get<{ message: string; posts: Post[] }>(
      'http://localhost:4000/api/posts'
    ).subscribe((postData) => {
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(id: string, title: string, content: string) {
    const post: Post = {
      id: id,
      title: title,
      content: content,
    };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}

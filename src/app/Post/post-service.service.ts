import { Injectable } from '@angular/core';
import { Post } from './postModel';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  /*  getPost(): Observable<Post[]> {
    const posts = of(this.posts);
    return posts;
  } */

  /* Here I get posts route */
  getPost() {
    //return [...this.posts];
    this.http
      .get<{ message: string; posts: any }>('http://localhost:4000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post: any) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((transformedtData) => {
        this.posts = transformedtData;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  getPosts(id: any) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      'http://localhost:4000/api/posts/' + id
    );
  }

  addPost(id: string, title: string, content: string) {
    const post: Post = {
      id: id,
      title: title,
      content: content,
    };
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:4000/api/posts',
        post
      )
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        //console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.http
      .put('http://localhost:4000/api/posts/' + id, post)
      .subscribe((response) => /*console.log(response)*/ {
        const updatedPosts = [...this.posts];
        const oldPostsIndex = updatedPosts.findIndex((p) => p.id === post.id);
        updatedPosts[oldPostsIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete('http://localhost:4000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}

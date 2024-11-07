import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostServiceService } from '../post-service.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../postModel';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId: string | undefined | null;
  public post: Post | any;

  constructor(
    public postService: PostServiceService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postService.getPosts(this.postId);
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.postService.addPost(
      form.value.id,
      form.value.title,
      form.value.content
    );
    form.resetForm();
  }
}

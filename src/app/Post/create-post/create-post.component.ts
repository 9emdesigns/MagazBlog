import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  forms: FormGroup | any;
  private mode = 'create';
  private postId: any;
  public post: Post | any;

  constructor(
    public postService: PostServiceService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.forms = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postService.getPosts(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
          this.forms.setValue({
            title: this.post.title,
            content: this.post.content,
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onAddPost() {
    if (this.forms.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postService.addPost(
        this.forms.value.id,
        this.forms.value.title,
        this.forms.value.content
      );
    } else {
      this.postService.updatePost(
        this.postId,
        this.forms.value.title,
        this.forms.value.content
      );
    }
    this.forms.reset();
  }
}

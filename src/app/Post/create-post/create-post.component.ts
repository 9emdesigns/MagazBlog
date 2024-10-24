import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  enteredTitle = '';
  enteredContent = '';

  constructor(public postService: PostServiceService) {}

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

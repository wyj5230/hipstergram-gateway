import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IPost, Post } from 'app/shared/model/social/post.model';
import { PostService } from './post.service';

@Component({
  selector: 'jhi-post-update',
  templateUrl: './post-update.component.html'
})
export class PostUpdateComponent implements OnInit {
  post: IPost;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    user: [null, [Validators.required]],
    description: [null, [Validators.required]],
    photo: [null, [Validators.required]],
    createdOn: [null, [Validators.required]]
  });

  constructor(protected postService: PostService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ post }) => {
      this.updateForm(post);
      this.post = post;
    });
  }

  updateForm(post: IPost) {
    this.editForm.patchValue({
      id: post.id,
      user: post.user,
      description: post.description,
      photo: post.photo,
      createdOn: post.createdOn != null ? post.createdOn.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const post = this.createFromForm();
    if (post.id !== undefined) {
      this.subscribeToSaveResponse(this.postService.update(post));
    } else {
      this.subscribeToSaveResponse(this.postService.create(post));
    }
  }

  private createFromForm(): IPost {
    const entity = {
      ...new Post(),
      id: this.editForm.get(['id']).value,
      user: this.editForm.get(['user']).value,
      description: this.editForm.get(['description']).value,
      photo: this.editForm.get(['photo']).value,
      createdOn:
        this.editForm.get(['createdOn']).value != null ? moment(this.editForm.get(['createdOn']).value, DATE_TIME_FORMAT) : undefined
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPost>>) {
    result.subscribe((res: HttpResponse<IPost>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}

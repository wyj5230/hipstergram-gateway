import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IComment, Comment } from 'app/shared/model/social/comment.model';
import { CommentService } from './comment.service';
import { IPost } from 'app/shared/model/social/post.model';
import { PostService } from 'app/entities/social/post';

@Component({
  selector: 'jhi-comment-update',
  templateUrl: './comment-update.component.html'
})
export class CommentUpdateComponent implements OnInit {
  comment: IComment;
  isSaving: boolean;

  posts: IPost[];

  editForm = this.fb.group({
    id: [],
    user: [null, [Validators.required]],
    text: [null, [Validators.required]],
    createdOn: [null, [Validators.required]],
    postId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected commentService: CommentService,
    protected postService: PostService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ comment }) => {
      this.updateForm(comment);
      this.comment = comment;
    });
    this.postService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPost[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPost[]>) => response.body)
      )
      .subscribe((res: IPost[]) => (this.posts = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(comment: IComment) {
    this.editForm.patchValue({
      id: comment.id,
      user: comment.user,
      text: comment.text,
      createdOn: comment.createdOn != null ? comment.createdOn.format(DATE_TIME_FORMAT) : null,
      postId: comment.postId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const comment = this.createFromForm();
    if (comment.id !== undefined) {
      this.subscribeToSaveResponse(this.commentService.update(comment));
    } else {
      this.subscribeToSaveResponse(this.commentService.create(comment));
    }
  }

  private createFromForm(): IComment {
    const entity = {
      ...new Comment(),
      id: this.editForm.get(['id']).value,
      user: this.editForm.get(['user']).value,
      text: this.editForm.get(['text']).value,
      createdOn:
        this.editForm.get(['createdOn']).value != null ? moment(this.editForm.get(['createdOn']).value, DATE_TIME_FORMAT) : undefined,
      postId: this.editForm.get(['postId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComment>>) {
    result.subscribe((res: HttpResponse<IComment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackPostById(index: number, item: IPost) {
    return item.id;
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ILike, Like } from 'app/shared/model/social/like.model';
import { LikeService } from './like.service';
import { IPost } from 'app/shared/model/social/post.model';
import { PostService } from 'app/entities/social/post';

@Component({
  selector: 'jhi-like-update',
  templateUrl: './like-update.component.html'
})
export class LikeUpdateComponent implements OnInit {
  like: ILike;
  isSaving: boolean;

  posts: IPost[];

  editForm = this.fb.group({
    id: [],
    user: [null, [Validators.required]],
    postId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected likeService: LikeService,
    protected postService: PostService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ like }) => {
      this.updateForm(like);
      this.like = like;
    });
    this.postService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPost[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPost[]>) => response.body)
      )
      .subscribe((res: IPost[]) => (this.posts = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(like: ILike) {
    this.editForm.patchValue({
      id: like.id,
      user: like.user,
      postId: like.postId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const like = this.createFromForm();
    if (like.id !== undefined) {
      this.subscribeToSaveResponse(this.likeService.update(like));
    } else {
      this.subscribeToSaveResponse(this.likeService.create(like));
    }
  }

  private createFromForm(): ILike {
    const entity = {
      ...new Like(),
      id: this.editForm.get(['id']).value,
      user: this.editForm.get(['user']).value,
      postId: this.editForm.get(['postId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILike>>) {
    result.subscribe((res: HttpResponse<ILike>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

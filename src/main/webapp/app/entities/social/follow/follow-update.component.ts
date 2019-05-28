import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IFollow, Follow } from 'app/shared/model/social/follow.model';
import { FollowService } from './follow.service';

@Component({
  selector: 'jhi-follow-update',
  templateUrl: './follow-update.component.html'
})
export class FollowUpdateComponent implements OnInit {
  follow: IFollow;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    user: [null, [Validators.required]],
    following: [null, [Validators.required]]
  });

  constructor(protected followService: FollowService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ follow }) => {
      this.updateForm(follow);
      this.follow = follow;
    });
  }

  updateForm(follow: IFollow) {
    this.editForm.patchValue({
      id: follow.id,
      user: follow.user,
      following: follow.following
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const follow = this.createFromForm();
    if (follow.id !== undefined) {
      this.subscribeToSaveResponse(this.followService.update(follow));
    } else {
      this.subscribeToSaveResponse(this.followService.create(follow));
    }
  }

  private createFromForm(): IFollow {
    const entity = {
      ...new Follow(),
      id: this.editForm.get(['id']).value,
      user: this.editForm.get(['user']).value,
      following: this.editForm.get(['following']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFollow>>) {
    result.subscribe((res: HttpResponse<IFollow>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}

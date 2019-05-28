import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILike } from 'app/shared/model/social/like.model';
import { LikeService } from './like.service';

@Component({
  selector: 'jhi-like-delete-dialog',
  templateUrl: './like-delete-dialog.component.html'
})
export class LikeDeleteDialogComponent {
  like: ILike;

  constructor(protected likeService: LikeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.likeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'likeListModification',
        content: 'Deleted an like'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-like-delete-popup',
  template: ''
})
export class LikeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ like }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LikeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.like = like;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/like', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/like', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}

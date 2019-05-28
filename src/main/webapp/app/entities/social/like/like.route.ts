import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Like } from 'app/shared/model/social/like.model';
import { LikeService } from './like.service';
import { LikeComponent } from './like.component';
import { LikeDetailComponent } from './like-detail.component';
import { LikeUpdateComponent } from './like-update.component';
import { LikeDeletePopupComponent } from './like-delete-dialog.component';
import { ILike } from 'app/shared/model/social/like.model';

@Injectable({ providedIn: 'root' })
export class LikeResolve implements Resolve<ILike> {
  constructor(private service: LikeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILike> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Like>) => response.ok),
        map((like: HttpResponse<Like>) => like.body)
      );
    }
    return of(new Like());
  }
}

export const likeRoute: Routes = [
  {
    path: '',
    component: LikeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.socialLike.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LikeDetailComponent,
    resolve: {
      like: LikeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.socialLike.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LikeUpdateComponent,
    resolve: {
      like: LikeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.socialLike.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LikeUpdateComponent,
    resolve: {
      like: LikeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.socialLike.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const likePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LikeDeletePopupComponent,
    resolve: {
      like: LikeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.socialLike.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'follow',
        loadChildren: './social/follow/follow.module#SocialFollowModule'
      },
      {
        path: 'post',
        loadChildren: './social/post/post.module#SocialPostModule'
      },
      {
        path: 'comment',
        loadChildren: './social/comment/comment.module#SocialCommentModule'
      },
      {
        path: 'photo',
        loadChildren: './filestore/photo/photo.module#FilestorePhotoModule'
      },
      {
        path: 'like',
        loadChildren: './social/like/like.module#SocialLikeModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}

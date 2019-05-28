import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  LikeComponent,
  LikeDetailComponent,
  LikeUpdateComponent,
  LikeDeletePopupComponent,
  LikeDeleteDialogComponent,
  likeRoute,
  likePopupRoute
} from './';

const ENTITY_STATES = [...likeRoute, ...likePopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [LikeComponent, LikeDetailComponent, LikeUpdateComponent, LikeDeleteDialogComponent, LikeDeletePopupComponent],
  entryComponents: [LikeComponent, LikeUpdateComponent, LikeDeleteDialogComponent, LikeDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SocialLikeModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}

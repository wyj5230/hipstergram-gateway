/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { LikeDetailComponent } from 'app/entities/social/like/like-detail.component';
import { Like } from 'app/shared/model/social/like.model';

describe('Component Tests', () => {
  describe('Like Management Detail Component', () => {
    let comp: LikeDetailComponent;
    let fixture: ComponentFixture<LikeDetailComponent>;
    const route = ({ data: of({ like: new Like('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [LikeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LikeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LikeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.like).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PhotoDetailComponent } from 'app/entities/filestore/photo/photo-detail.component';
import { Photo } from 'app/shared/model/filestore/photo.model';

describe('Component Tests', () => {
  describe('Photo Management Detail Component', () => {
    let comp: PhotoDetailComponent;
    let fixture: ComponentFixture<PhotoDetailComponent>;
    const route = ({ data: of({ photo: new Photo('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PhotoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PhotoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PhotoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.photo).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});

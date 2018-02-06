/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InnovationPortalTestModule } from '../../../test.module';
import { CommentMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/comment-my-suffix/comment-my-suffix-detail.component';
import { CommentMySuffixService } from '../../../../../../main/webapp/app/entities/comment-my-suffix/comment-my-suffix.service';
import { CommentMySuffix } from '../../../../../../main/webapp/app/entities/comment-my-suffix/comment-my-suffix.model';

describe('Component Tests', () => {

    describe('CommentMySuffix Management Detail Component', () => {
        let comp: CommentMySuffixDetailComponent;
        let fixture: ComponentFixture<CommentMySuffixDetailComponent>;
        let service: CommentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [CommentMySuffixDetailComponent],
                providers: [
                    CommentMySuffixService
                ]
            })
            .overrideTemplate(CommentMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new CommentMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.comment).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

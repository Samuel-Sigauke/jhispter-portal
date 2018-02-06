/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InnovationPortalTestModule } from '../../../test.module';
import { CommentMySuffixComponent } from '../../../../../../main/webapp/app/entities/comment-my-suffix/comment-my-suffix.component';
import { CommentMySuffixService } from '../../../../../../main/webapp/app/entities/comment-my-suffix/comment-my-suffix.service';
import { CommentMySuffix } from '../../../../../../main/webapp/app/entities/comment-my-suffix/comment-my-suffix.model';

describe('Component Tests', () => {

    describe('CommentMySuffix Management Component', () => {
        let comp: CommentMySuffixComponent;
        let fixture: ComponentFixture<CommentMySuffixComponent>;
        let service: CommentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [CommentMySuffixComponent],
                providers: [
                    CommentMySuffixService
                ]
            })
            .overrideTemplate(CommentMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CommentMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.comments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InnovationPortalTestModule } from '../../../test.module';
import { CommentMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/comment-my-suffix/comment-my-suffix-delete-dialog.component';
import { CommentMySuffixService } from '../../../../../../main/webapp/app/entities/comment-my-suffix/comment-my-suffix.service';

describe('Component Tests', () => {

    describe('CommentMySuffix Management Delete Component', () => {
        let comp: CommentMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CommentMySuffixDeleteDialogComponent>;
        let service: CommentMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [CommentMySuffixDeleteDialogComponent],
                providers: [
                    CommentMySuffixService
                ]
            })
            .overrideTemplate(CommentMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InnovationPortalTestModule } from '../../../test.module';
import { CommentMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/comment-my-suffix/comment-my-suffix-dialog.component';
import { CommentMySuffixService } from '../../../../../../main/webapp/app/entities/comment-my-suffix/comment-my-suffix.service';
import { CommentMySuffix } from '../../../../../../main/webapp/app/entities/comment-my-suffix/comment-my-suffix.model';
import { IdeaMySuffixService } from '../../../../../../main/webapp/app/entities/idea-my-suffix';

describe('Component Tests', () => {

    describe('CommentMySuffix Management Dialog Component', () => {
        let comp: CommentMySuffixDialogComponent;
        let fixture: ComponentFixture<CommentMySuffixDialogComponent>;
        let service: CommentMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [CommentMySuffixDialogComponent],
                providers: [
                    IdeaMySuffixService,
                    CommentMySuffixService
                ]
            })
            .overrideTemplate(CommentMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CommentMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.comment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'commentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CommentMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.comment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'commentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

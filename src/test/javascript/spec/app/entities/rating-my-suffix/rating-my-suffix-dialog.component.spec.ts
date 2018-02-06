/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InnovationPortalTestModule } from '../../../test.module';
import { RatingMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/rating-my-suffix/rating-my-suffix-dialog.component';
import { RatingMySuffixService } from '../../../../../../main/webapp/app/entities/rating-my-suffix/rating-my-suffix.service';
import { RatingMySuffix } from '../../../../../../main/webapp/app/entities/rating-my-suffix/rating-my-suffix.model';
import { IdeaMySuffixService } from '../../../../../../main/webapp/app/entities/idea-my-suffix';

describe('Component Tests', () => {

    describe('RatingMySuffix Management Dialog Component', () => {
        let comp: RatingMySuffixDialogComponent;
        let fixture: ComponentFixture<RatingMySuffixDialogComponent>;
        let service: RatingMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [RatingMySuffixDialogComponent],
                providers: [
                    IdeaMySuffixService,
                    RatingMySuffixService
                ]
            })
            .overrideTemplate(RatingMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RatingMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RatingMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RatingMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.rating = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ratingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RatingMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.rating = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ratingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

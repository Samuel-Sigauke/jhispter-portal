/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InnovationPortalTestModule } from '../../../test.module';
import { IdeaMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/idea-my-suffix/idea-my-suffix-dialog.component';
import { IdeaMySuffixService } from '../../../../../../main/webapp/app/entities/idea-my-suffix/idea-my-suffix.service';
import { IdeaMySuffix } from '../../../../../../main/webapp/app/entities/idea-my-suffix/idea-my-suffix.model';
import { InnovationChallengeMySuffixService } from '../../../../../../main/webapp/app/entities/innovation-challenge-my-suffix';

describe('Component Tests', () => {

    describe('IdeaMySuffix Management Dialog Component', () => {
        let comp: IdeaMySuffixDialogComponent;
        let fixture: ComponentFixture<IdeaMySuffixDialogComponent>;
        let service: IdeaMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [IdeaMySuffixDialogComponent],
                providers: [
                    InnovationChallengeMySuffixService,
                    IdeaMySuffixService
                ]
            })
            .overrideTemplate(IdeaMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IdeaMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IdeaMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new IdeaMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.idea = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ideaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new IdeaMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.idea = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ideaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

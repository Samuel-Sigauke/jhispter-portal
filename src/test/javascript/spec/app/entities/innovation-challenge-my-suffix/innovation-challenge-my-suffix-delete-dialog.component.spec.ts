/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InnovationPortalTestModule } from '../../../test.module';
import { InnovationChallengeMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/innovation-challenge-my-suffix/innovation-challenge-my-suffix-delete-dialog.component';
import { InnovationChallengeMySuffixService } from '../../../../../../main/webapp/app/entities/innovation-challenge-my-suffix/innovation-challenge-my-suffix.service';

describe('Component Tests', () => {

    describe('InnovationChallengeMySuffix Management Delete Component', () => {
        let comp: InnovationChallengeMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<InnovationChallengeMySuffixDeleteDialogComponent>;
        let service: InnovationChallengeMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [InnovationChallengeMySuffixDeleteDialogComponent],
                providers: [
                    InnovationChallengeMySuffixService
                ]
            })
            .overrideTemplate(InnovationChallengeMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InnovationChallengeMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InnovationChallengeMySuffixService);
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

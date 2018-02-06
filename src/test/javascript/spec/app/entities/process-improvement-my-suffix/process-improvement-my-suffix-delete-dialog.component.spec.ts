/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InnovationPortalTestModule } from '../../../test.module';
import { ProcessImprovementMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/process-improvement-my-suffix/process-improvement-my-suffix-delete-dialog.component';
import { ProcessImprovementMySuffixService } from '../../../../../../main/webapp/app/entities/process-improvement-my-suffix/process-improvement-my-suffix.service';

describe('Component Tests', () => {

    describe('ProcessImprovementMySuffix Management Delete Component', () => {
        let comp: ProcessImprovementMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ProcessImprovementMySuffixDeleteDialogComponent>;
        let service: ProcessImprovementMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [ProcessImprovementMySuffixDeleteDialogComponent],
                providers: [
                    ProcessImprovementMySuffixService
                ]
            })
            .overrideTemplate(ProcessImprovementMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProcessImprovementMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProcessImprovementMySuffixService);
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

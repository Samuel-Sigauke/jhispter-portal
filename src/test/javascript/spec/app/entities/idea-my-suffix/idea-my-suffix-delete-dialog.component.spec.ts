/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InnovationPortalTestModule } from '../../../test.module';
import { IdeaMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/idea-my-suffix/idea-my-suffix-delete-dialog.component';
import { IdeaMySuffixService } from '../../../../../../main/webapp/app/entities/idea-my-suffix/idea-my-suffix.service';

describe('Component Tests', () => {

    describe('IdeaMySuffix Management Delete Component', () => {
        let comp: IdeaMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<IdeaMySuffixDeleteDialogComponent>;
        let service: IdeaMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [IdeaMySuffixDeleteDialogComponent],
                providers: [
                    IdeaMySuffixService
                ]
            })
            .overrideTemplate(IdeaMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IdeaMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IdeaMySuffixService);
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

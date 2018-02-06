/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InnovationPortalTestModule } from '../../../test.module';
import { CategoryMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/category-my-suffix/category-my-suffix-dialog.component';
import { CategoryMySuffixService } from '../../../../../../main/webapp/app/entities/category-my-suffix/category-my-suffix.service';
import { CategoryMySuffix } from '../../../../../../main/webapp/app/entities/category-my-suffix/category-my-suffix.model';

describe('Component Tests', () => {

    describe('CategoryMySuffix Management Dialog Component', () => {
        let comp: CategoryMySuffixDialogComponent;
        let fixture: ComponentFixture<CategoryMySuffixDialogComponent>;
        let service: CategoryMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [CategoryMySuffixDialogComponent],
                providers: [
                    CategoryMySuffixService
                ]
            })
            .overrideTemplate(CategoryMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CategoryMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.category = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'categoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CategoryMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.category = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'categoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

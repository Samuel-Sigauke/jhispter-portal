/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InnovationPortalTestModule } from '../../../test.module';
import { ProcessImprovementMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/process-improvement-my-suffix/process-improvement-my-suffix-detail.component';
import { ProcessImprovementMySuffixService } from '../../../../../../main/webapp/app/entities/process-improvement-my-suffix/process-improvement-my-suffix.service';
import { ProcessImprovementMySuffix } from '../../../../../../main/webapp/app/entities/process-improvement-my-suffix/process-improvement-my-suffix.model';

describe('Component Tests', () => {

    describe('ProcessImprovementMySuffix Management Detail Component', () => {
        let comp: ProcessImprovementMySuffixDetailComponent;
        let fixture: ComponentFixture<ProcessImprovementMySuffixDetailComponent>;
        let service: ProcessImprovementMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [ProcessImprovementMySuffixDetailComponent],
                providers: [
                    ProcessImprovementMySuffixService
                ]
            })
            .overrideTemplate(ProcessImprovementMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProcessImprovementMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProcessImprovementMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ProcessImprovementMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.processImprovement).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

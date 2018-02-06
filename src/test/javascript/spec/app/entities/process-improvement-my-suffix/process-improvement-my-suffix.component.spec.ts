/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InnovationPortalTestModule } from '../../../test.module';
import { ProcessImprovementMySuffixComponent } from '../../../../../../main/webapp/app/entities/process-improvement-my-suffix/process-improvement-my-suffix.component';
import { ProcessImprovementMySuffixService } from '../../../../../../main/webapp/app/entities/process-improvement-my-suffix/process-improvement-my-suffix.service';
import { ProcessImprovementMySuffix } from '../../../../../../main/webapp/app/entities/process-improvement-my-suffix/process-improvement-my-suffix.model';

describe('Component Tests', () => {

    describe('ProcessImprovementMySuffix Management Component', () => {
        let comp: ProcessImprovementMySuffixComponent;
        let fixture: ComponentFixture<ProcessImprovementMySuffixComponent>;
        let service: ProcessImprovementMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [ProcessImprovementMySuffixComponent],
                providers: [
                    ProcessImprovementMySuffixService
                ]
            })
            .overrideTemplate(ProcessImprovementMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProcessImprovementMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProcessImprovementMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ProcessImprovementMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.processImprovements[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

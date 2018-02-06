/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InnovationPortalTestModule } from '../../../test.module';
import { InnovationChallengeMySuffixComponent } from '../../../../../../main/webapp/app/entities/innovation-challenge-my-suffix/innovation-challenge-my-suffix.component';
import { InnovationChallengeMySuffixService } from '../../../../../../main/webapp/app/entities/innovation-challenge-my-suffix/innovation-challenge-my-suffix.service';
import { InnovationChallengeMySuffix } from '../../../../../../main/webapp/app/entities/innovation-challenge-my-suffix/innovation-challenge-my-suffix.model';

describe('Component Tests', () => {

    describe('InnovationChallengeMySuffix Management Component', () => {
        let comp: InnovationChallengeMySuffixComponent;
        let fixture: ComponentFixture<InnovationChallengeMySuffixComponent>;
        let service: InnovationChallengeMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [InnovationChallengeMySuffixComponent],
                providers: [
                    InnovationChallengeMySuffixService
                ]
            })
            .overrideTemplate(InnovationChallengeMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InnovationChallengeMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InnovationChallengeMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new InnovationChallengeMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.innovationChallenges[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

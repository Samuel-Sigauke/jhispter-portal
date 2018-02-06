/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InnovationPortalTestModule } from '../../../test.module';
import { InnovationChallengeMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/innovation-challenge-my-suffix/innovation-challenge-my-suffix-detail.component';
import { InnovationChallengeMySuffixService } from '../../../../../../main/webapp/app/entities/innovation-challenge-my-suffix/innovation-challenge-my-suffix.service';
import { InnovationChallengeMySuffix } from '../../../../../../main/webapp/app/entities/innovation-challenge-my-suffix/innovation-challenge-my-suffix.model';

describe('Component Tests', () => {

    describe('InnovationChallengeMySuffix Management Detail Component', () => {
        let comp: InnovationChallengeMySuffixDetailComponent;
        let fixture: ComponentFixture<InnovationChallengeMySuffixDetailComponent>;
        let service: InnovationChallengeMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [InnovationChallengeMySuffixDetailComponent],
                providers: [
                    InnovationChallengeMySuffixService
                ]
            })
            .overrideTemplate(InnovationChallengeMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InnovationChallengeMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InnovationChallengeMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new InnovationChallengeMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.innovationChallenge).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InnovationPortalTestModule } from '../../../test.module';
import { RatingMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/rating-my-suffix/rating-my-suffix-detail.component';
import { RatingMySuffixService } from '../../../../../../main/webapp/app/entities/rating-my-suffix/rating-my-suffix.service';
import { RatingMySuffix } from '../../../../../../main/webapp/app/entities/rating-my-suffix/rating-my-suffix.model';

describe('Component Tests', () => {

    describe('RatingMySuffix Management Detail Component', () => {
        let comp: RatingMySuffixDetailComponent;
        let fixture: ComponentFixture<RatingMySuffixDetailComponent>;
        let service: RatingMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [RatingMySuffixDetailComponent],
                providers: [
                    RatingMySuffixService
                ]
            })
            .overrideTemplate(RatingMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RatingMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RatingMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new RatingMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rating).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

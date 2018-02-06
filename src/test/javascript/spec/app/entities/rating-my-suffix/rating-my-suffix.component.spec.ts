/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InnovationPortalTestModule } from '../../../test.module';
import { RatingMySuffixComponent } from '../../../../../../main/webapp/app/entities/rating-my-suffix/rating-my-suffix.component';
import { RatingMySuffixService } from '../../../../../../main/webapp/app/entities/rating-my-suffix/rating-my-suffix.service';
import { RatingMySuffix } from '../../../../../../main/webapp/app/entities/rating-my-suffix/rating-my-suffix.model';

describe('Component Tests', () => {

    describe('RatingMySuffix Management Component', () => {
        let comp: RatingMySuffixComponent;
        let fixture: ComponentFixture<RatingMySuffixComponent>;
        let service: RatingMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [RatingMySuffixComponent],
                providers: [
                    RatingMySuffixService
                ]
            })
            .overrideTemplate(RatingMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RatingMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RatingMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new RatingMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ratings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

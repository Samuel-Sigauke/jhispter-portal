/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InnovationPortalTestModule } from '../../../test.module';
import { IdeaMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/idea-my-suffix/idea-my-suffix-detail.component';
import { IdeaMySuffixService } from '../../../../../../main/webapp/app/entities/idea-my-suffix/idea-my-suffix.service';
import { IdeaMySuffix } from '../../../../../../main/webapp/app/entities/idea-my-suffix/idea-my-suffix.model';

describe('Component Tests', () => {

    describe('IdeaMySuffix Management Detail Component', () => {
        let comp: IdeaMySuffixDetailComponent;
        let fixture: ComponentFixture<IdeaMySuffixDetailComponent>;
        let service: IdeaMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [IdeaMySuffixDetailComponent],
                providers: [
                    IdeaMySuffixService
                ]
            })
            .overrideTemplate(IdeaMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IdeaMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IdeaMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new IdeaMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.idea).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

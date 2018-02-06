/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InnovationPortalTestModule } from '../../../test.module';
import { CategoryMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/category-my-suffix/category-my-suffix-detail.component';
import { CategoryMySuffixService } from '../../../../../../main/webapp/app/entities/category-my-suffix/category-my-suffix.service';
import { CategoryMySuffix } from '../../../../../../main/webapp/app/entities/category-my-suffix/category-my-suffix.model';

describe('Component Tests', () => {

    describe('CategoryMySuffix Management Detail Component', () => {
        let comp: CategoryMySuffixDetailComponent;
        let fixture: ComponentFixture<CategoryMySuffixDetailComponent>;
        let service: CategoryMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [CategoryMySuffixDetailComponent],
                providers: [
                    CategoryMySuffixService
                ]
            })
            .overrideTemplate(CategoryMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new CategoryMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.category).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

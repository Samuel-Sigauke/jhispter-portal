/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InnovationPortalTestModule } from '../../../test.module';
import { CategoryMySuffixComponent } from '../../../../../../main/webapp/app/entities/category-my-suffix/category-my-suffix.component';
import { CategoryMySuffixService } from '../../../../../../main/webapp/app/entities/category-my-suffix/category-my-suffix.service';
import { CategoryMySuffix } from '../../../../../../main/webapp/app/entities/category-my-suffix/category-my-suffix.model';

describe('Component Tests', () => {

    describe('CategoryMySuffix Management Component', () => {
        let comp: CategoryMySuffixComponent;
        let fixture: ComponentFixture<CategoryMySuffixComponent>;
        let service: CategoryMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [CategoryMySuffixComponent],
                providers: [
                    CategoryMySuffixService
                ]
            })
            .overrideTemplate(CategoryMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CategoryMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.categories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

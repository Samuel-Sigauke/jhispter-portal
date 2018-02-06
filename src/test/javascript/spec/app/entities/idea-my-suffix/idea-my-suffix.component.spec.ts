/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { InnovationPortalTestModule } from '../../../test.module';
import { IdeaMySuffixComponent } from '../../../../../../main/webapp/app/entities/idea-my-suffix/idea-my-suffix.component';
import { IdeaMySuffixService } from '../../../../../../main/webapp/app/entities/idea-my-suffix/idea-my-suffix.service';
import { IdeaMySuffix } from '../../../../../../main/webapp/app/entities/idea-my-suffix/idea-my-suffix.model';

describe('Component Tests', () => {

    describe('IdeaMySuffix Management Component', () => {
        let comp: IdeaMySuffixComponent;
        let fixture: ComponentFixture<IdeaMySuffixComponent>;
        let service: IdeaMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InnovationPortalTestModule],
                declarations: [IdeaMySuffixComponent],
                providers: [
                    IdeaMySuffixService
                ]
            })
            .overrideTemplate(IdeaMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IdeaMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IdeaMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new IdeaMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ideas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

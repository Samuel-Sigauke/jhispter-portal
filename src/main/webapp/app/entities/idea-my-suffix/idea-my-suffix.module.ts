import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { MomentModule } from 'angular2-moment';
import { Pipe, PipeTransform } from '@angular/core';

import { InnovationPortalSharedModule } from '../../shared';
import {
    IdeaMySuffixService,
    IdeaMySuffixPopupService,
    IdeaMySuffixComponent,
    IdeaMySuffixDetailComponent,
    IdeaMySuffixDialogComponent,
    IdeaMySuffixPopupComponent,
    IdeaMySuffixDeletePopupComponent,
    IdeaMySuffixDeleteDialogComponent,
    ideaRoute,
    ideaPopupRoute,
    SummaryPipe,
    IdeaPipe,
    DataPipe,

} from './';

const ENTITY_STATES = [
    ...ideaRoute,
    ...ideaPopupRoute,
];

@NgModule({
    imports: [
        InnovationPortalSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        StarRatingModule.forRoot(),
        MomentModule
    ],
    declarations: [
        IdeaMySuffixComponent,
        IdeaMySuffixDetailComponent,
        IdeaMySuffixDialogComponent,
        IdeaMySuffixDeleteDialogComponent,
        IdeaMySuffixPopupComponent,
        IdeaMySuffixDeletePopupComponent,
        SummaryPipe,
        IdeaPipe,
        DataPipe,

    ],
    entryComponents: [
        IdeaMySuffixComponent,
        IdeaMySuffixDialogComponent,
        IdeaMySuffixPopupComponent,
        IdeaMySuffixDeleteDialogComponent,
        IdeaMySuffixDeletePopupComponent,
    ],
    providers: [
        IdeaMySuffixService,
        IdeaMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InnovationPortalIdeaMySuffixModule {}

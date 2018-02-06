import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

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
} from './';

const ENTITY_STATES = [
    ...ideaRoute,
    ...ideaPopupRoute,
];

@NgModule({
    imports: [
        InnovationPortalSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IdeaMySuffixComponent,
        IdeaMySuffixDetailComponent,
        IdeaMySuffixDialogComponent,
        IdeaMySuffixDeleteDialogComponent,
        IdeaMySuffixPopupComponent,
        IdeaMySuffixDeletePopupComponent,
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

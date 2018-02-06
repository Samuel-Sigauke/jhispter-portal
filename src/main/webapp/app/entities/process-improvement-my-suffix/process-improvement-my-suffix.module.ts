import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InnovationPortalSharedModule } from '../../shared';
import {
    ProcessImprovementMySuffixService,
    ProcessImprovementMySuffixPopupService,
    ProcessImprovementMySuffixComponent,
    ProcessImprovementMySuffixDetailComponent,
    ProcessImprovementMySuffixDialogComponent,
    ProcessImprovementMySuffixPopupComponent,
    ProcessImprovementMySuffixDeletePopupComponent,
    ProcessImprovementMySuffixDeleteDialogComponent,
    processImprovementRoute,
    processImprovementPopupRoute,
} from './';

const ENTITY_STATES = [
    ...processImprovementRoute,
    ...processImprovementPopupRoute,
];

@NgModule({
    imports: [
        InnovationPortalSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProcessImprovementMySuffixComponent,
        ProcessImprovementMySuffixDetailComponent,
        ProcessImprovementMySuffixDialogComponent,
        ProcessImprovementMySuffixDeleteDialogComponent,
        ProcessImprovementMySuffixPopupComponent,
        ProcessImprovementMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ProcessImprovementMySuffixComponent,
        ProcessImprovementMySuffixDialogComponent,
        ProcessImprovementMySuffixPopupComponent,
        ProcessImprovementMySuffixDeleteDialogComponent,
        ProcessImprovementMySuffixDeletePopupComponent,
    ],
    providers: [
        ProcessImprovementMySuffixService,
        ProcessImprovementMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InnovationPortalProcessImprovementMySuffixModule {}

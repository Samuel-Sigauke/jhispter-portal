import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InnovationPortalSharedModule } from '../../shared';
import {
    InnovationChallengeMySuffixService,
    InnovationChallengeMySuffixPopupService,
    InnovationChallengeMySuffixComponent,
    InnovationChallengeMySuffixDetailComponent,
    InnovationChallengeMySuffixDialogComponent,
    InnovationChallengeMySuffixPopupComponent,
    InnovationChallengeMySuffixDeletePopupComponent,
    InnovationChallengeMySuffixDeleteDialogComponent,
    innovationChallengeRoute,
    innovationChallengePopupRoute,
} from './';

const ENTITY_STATES = [
    ...innovationChallengeRoute,
    ...innovationChallengePopupRoute,
];

@NgModule({
    imports: [
        InnovationPortalSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InnovationChallengeMySuffixComponent,
        InnovationChallengeMySuffixDetailComponent,
        InnovationChallengeMySuffixDialogComponent,
        InnovationChallengeMySuffixDeleteDialogComponent,
        InnovationChallengeMySuffixPopupComponent,
        InnovationChallengeMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        InnovationChallengeMySuffixComponent,
        InnovationChallengeMySuffixDialogComponent,
        InnovationChallengeMySuffixPopupComponent,
        InnovationChallengeMySuffixDeleteDialogComponent,
        InnovationChallengeMySuffixDeletePopupComponent,
    ],
    providers: [
        InnovationChallengeMySuffixService,
        InnovationChallengeMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InnovationPortalInnovationChallengeMySuffixModule {}

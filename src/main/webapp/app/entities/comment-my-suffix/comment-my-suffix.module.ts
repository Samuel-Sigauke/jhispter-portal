import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InnovationPortalSharedModule } from '../../shared';
import {
    CommentMySuffixService,
    CommentMySuffixPopupService,
    CommentMySuffixComponent,
    CommentMySuffixDetailComponent,
    CommentMySuffixDialogComponent,
    CommentMySuffixPopupComponent,
    CommentMySuffixDeletePopupComponent,
    CommentMySuffixDeleteDialogComponent,
    commentRoute,
    commentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...commentRoute,
    ...commentPopupRoute,
];

@NgModule({
    imports: [
        InnovationPortalSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CommentMySuffixComponent,
        CommentMySuffixDetailComponent,
        CommentMySuffixDialogComponent,
        CommentMySuffixDeleteDialogComponent,
        CommentMySuffixPopupComponent,
        CommentMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CommentMySuffixComponent,
        CommentMySuffixDialogComponent,
        CommentMySuffixPopupComponent,
        CommentMySuffixDeleteDialogComponent,
        CommentMySuffixDeletePopupComponent,
    ],
    providers: [
        CommentMySuffixService,
        CommentMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InnovationPortalCommentMySuffixModule {}

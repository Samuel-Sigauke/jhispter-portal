import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InnovationPortalSharedModule } from '../../shared';
import {
    CategoryMySuffixService,
    CategoryMySuffixPopupService,
    CategoryMySuffixComponent,
    CategoryMySuffixDetailComponent,
    CategoryMySuffixDialogComponent,
    CategoryMySuffixPopupComponent,
    CategoryMySuffixDeletePopupComponent,
    CategoryMySuffixDeleteDialogComponent,
    categoryRoute,
    categoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...categoryRoute,
    ...categoryPopupRoute,
];

@NgModule({
    imports: [
        InnovationPortalSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CategoryMySuffixComponent,
        CategoryMySuffixDetailComponent,
        CategoryMySuffixDialogComponent,
        CategoryMySuffixDeleteDialogComponent,
        CategoryMySuffixPopupComponent,
        CategoryMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CategoryMySuffixComponent,
        CategoryMySuffixDialogComponent,
        CategoryMySuffixPopupComponent,
        CategoryMySuffixDeleteDialogComponent,
        CategoryMySuffixDeletePopupComponent,
    ],
    providers: [
        CategoryMySuffixService,
        CategoryMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InnovationPortalCategoryMySuffixModule {}

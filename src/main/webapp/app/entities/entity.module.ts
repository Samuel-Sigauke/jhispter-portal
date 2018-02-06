import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { InnovationPortalIdeaMySuffixModule } from './idea-my-suffix/idea-my-suffix.module';
import { InnovationPortalCommentMySuffixModule } from './comment-my-suffix/comment-my-suffix.module';
import { InnovationPortalProcessImprovementMySuffixModule } from './process-improvement-my-suffix/process-improvement-my-suffix.module';
import { InnovationPortalInnovationChallengeMySuffixModule } from './innovation-challenge-my-suffix/innovation-challenge-my-suffix.module';
import { InnovationPortalCategoryMySuffixModule } from './category-my-suffix/category-my-suffix.module';
import { InnovationPortalRatingMySuffixModule } from './rating-my-suffix/rating-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        InnovationPortalIdeaMySuffixModule,
        InnovationPortalCommentMySuffixModule,
        InnovationPortalProcessImprovementMySuffixModule,
        InnovationPortalInnovationChallengeMySuffixModule,
        InnovationPortalCategoryMySuffixModule,
        InnovationPortalRatingMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InnovationPortalEntityModule {}

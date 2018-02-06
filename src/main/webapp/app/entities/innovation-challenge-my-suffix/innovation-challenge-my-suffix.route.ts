import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { InnovationChallengeMySuffixComponent } from './innovation-challenge-my-suffix.component';
import { InnovationChallengeMySuffixDetailComponent } from './innovation-challenge-my-suffix-detail.component';
import { InnovationChallengeMySuffixPopupComponent } from './innovation-challenge-my-suffix-dialog.component';
import { InnovationChallengeMySuffixDeletePopupComponent } from './innovation-challenge-my-suffix-delete-dialog.component';

export const innovationChallengeRoute: Routes = [
    {
        path: 'innovation-challenge-my-suffix',
        component: InnovationChallengeMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.innovationChallenge.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'innovation-challenge-my-suffix/:id',
        component: InnovationChallengeMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.innovationChallenge.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const innovationChallengePopupRoute: Routes = [
    {
        path: 'innovation-challenge-my-suffix-new',
        component: InnovationChallengeMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.innovationChallenge.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'innovation-challenge-my-suffix/:id/edit',
        component: InnovationChallengeMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.innovationChallenge.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'innovation-challenge-my-suffix/:id/delete',
        component: InnovationChallengeMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.innovationChallenge.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

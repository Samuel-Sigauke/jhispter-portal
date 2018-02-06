import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RatingMySuffixComponent } from './rating-my-suffix.component';
import { RatingMySuffixDetailComponent } from './rating-my-suffix-detail.component';
import { RatingMySuffixPopupComponent } from './rating-my-suffix-dialog.component';
import { RatingMySuffixDeletePopupComponent } from './rating-my-suffix-delete-dialog.component';

export const ratingRoute: Routes = [
    {
        path: 'rating-my-suffix',
        component: RatingMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.rating.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rating-my-suffix/:id',
        component: RatingMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.rating.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ratingPopupRoute: Routes = [
    {
        path: 'rating-my-suffix-new',
        component: RatingMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.rating.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rating-my-suffix/:id/edit',
        component: RatingMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.rating.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rating-my-suffix/:id/delete',
        component: RatingMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.rating.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

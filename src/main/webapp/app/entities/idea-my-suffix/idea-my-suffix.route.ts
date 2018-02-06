import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IdeaMySuffixComponent } from './idea-my-suffix.component';
import { IdeaMySuffixDetailComponent } from './idea-my-suffix-detail.component';
import { IdeaMySuffixPopupComponent } from './idea-my-suffix-dialog.component';
import { IdeaMySuffixDeletePopupComponent } from './idea-my-suffix-delete-dialog.component';

export const ideaRoute: Routes = [
    {
        path: 'idea-my-suffix',
        component: IdeaMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.idea.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'idea-my-suffix/:id',
        component: IdeaMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.idea.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ideaPopupRoute: Routes = [
    {
        path: 'idea-my-suffix-new',
        component: IdeaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.idea.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'idea-my-suffix/:id/edit',
        component: IdeaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.idea.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'idea-my-suffix/:id/delete',
        component: IdeaMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.idea.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
